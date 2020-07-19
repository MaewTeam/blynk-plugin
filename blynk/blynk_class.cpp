#ifndef __BLYNK_CLASS_CPP__
#define __BLYNK_CLASS_CPP__

#include "blynk_class.h"
#include "esp_log.h"

char buffVW[20];

/* Blynk client state handler */
static void state_handler(blynk_client_t *c, const blynk_state_evt_t *ev, void *data) {
	ESP_LOGI("Blynk", "state: %d\n", ev->state);
}

/* PinMode handler */
static void pm_handler(blynk_client_t *c, uint16_t id, const char *cmd, int argc, char **argv, void *data) {
	ESP_LOGI("Blynk", "pinmode handler %s: %s", argv[0], argv[1]);
	if (argc > 1) {
		uint8_t pin = atoi(argv[0]);
		char* mode = argv[1];
		if (strcmp(mode, "in") == 0) {
			ESP_LOGI("Blynk", "Set GPIO%d to input", pin);
			gpio_set_direction((gpio_num_t) pin, GPIO_MODE_INPUT);
			if (pin == 16 || pin == 14) {
				gpio_set_pull_mode((gpio_num_t) pin, GPIO_PULLUP_ONLY);
			} else {
				gpio_set_pull_mode((gpio_num_t) pin, GPIO_FLOATING);
			}
		} else if (strcmp(mode, "out") == 0) {
			ESP_LOGI("Blynk", "Set GPIO%d to output", pin);
			gpio_set_pull_mode((gpio_num_t) pin, GPIO_FLOATING);
			gpio_set_direction((gpio_num_t) pin, GPIO_MODE_OUTPUT);
		} else if (strcmp(mode, "pu") == 0) {
			ESP_LOGI("Blynk", "Set GPIO%d to input pull-up", pin);
			gpio_set_direction((gpio_num_t) pin, GPIO_MODE_INPUT);
			gpio_set_pull_mode((gpio_num_t) pin, GPIO_PULLUP_ONLY);
		} else if (strcmp(mode, "pd") == 0) {
			ESP_LOGI("Blynk", "Set GPIO%d to input pull-down", pin);
			gpio_set_direction((gpio_num_t) pin, GPIO_MODE_INPUT);
			gpio_set_pull_mode((gpio_num_t) pin, GPIO_PULLDOWN_ONLY);
		}
	}
}

/* Digital write handler */
static void dw_handler(blynk_client_t *c, uint16_t id, const char *cmd, int argc, char **argv, void *data) {
	ESP_LOGI("Blynk", "digital write handler %s: %s", argv[0], argv[1]);
	if (argc > 1) {
		uint8_t pin = atoi(argv[0]);
		uint32_t value = atoi(argv[1]);

		gpio_set_level((gpio_num_t) pin, value);
	}
}

/* Digital read handler */
static void dr_handler(blynk_client_t *c, uint16_t id, const char *cmd, int argc, char **argv, void *data) {
	ESP_LOGI("Blynk", "digital read handler %s", argv[0]);

	if (!argc) {
		return;
	}

	uint8_t pin = atoi(argv[0]);
	uint8_t value = gpio_get_level((gpio_num_t) pin);
	blynk_send(c, BLYNK_CMD_HARDWARE, 0, "sii", "dw", pin, value);

	ESP_LOGI("Blynk", "Send dw %d %d", pin, value);
}

/* Virtual write handler */
static void vw_handler(blynk_client_t *c, uint16_t id, const char *cmd, int argc, char **argv, void *data) {
	ESP_LOGI("Blynk", "write handler %s: %s", argv[0], argv[1]);
	if (argc > 1) {
		uint8_t vp = atoi(argv[0]);
		uint32_t value = atoi(argv[1]);
		strcpy(buffVW, argv[1]);

		if (VWhandler[vp]) {
			VWhandler[vp]();
		}
	}
}

/* Virtual read handler */
static void vr_handler(blynk_client_t *c, uint16_t id, const char *cmd, int argc, char **argv, void *data) {
	ESP_LOGI("Blynk", "read handler");

	if (!argc) {
		return;
	}

	uint8_t vp = atoi(argv[0]);
	if (VRhandler[vp]) {
		VRhandler[vp]();
	}
}

Blynk::Blynk()
{
	polling_ms = 40;
}

void Blynk::init(void)
{
	// Debug
	esp_log_level_set("*", ESP_LOG_VERBOSE);

	// clear error flag
	error = false;
	// clear initialized flag
	initialized = true;

	client = (blynk_client_t*)malloc(sizeof(blynk_client_t));

	state = s_init;
}

int Blynk::prop_count(void)
{
	// not supported
	return 0;
}

bool Blynk::prop_name(int index, char *name)
{
	// not supported
	return false;
}

bool Blynk::prop_unit(int index, char *unit)
{
	// not supported
	return false;
}

bool Blynk::prop_attr(int index, char *attr)
{
	// not supported
	return false;
}

bool Blynk::prop_read(int index, char *value)
{
	// not supported
	return false;
}

bool Blynk::prop_write(int index, char *value)
{
	// not supported
	return false;
}
// --------------------------------------

void Blynk::process(Driver *drv)
{	
	switch (state) {
		case s_init: {
			blynk_err_t res = blynk_init(client);
			if (res == BLYNK_OK) {
				ESP_LOGI("B", "Error: %d", (int)blynk_set_options(client, &opt));

				/* Subscribe to state changes and errors */
				blynk_set_state_handler(client, state_handler, NULL);

				/* blynk_set_handler sets hardware (BLYNK_CMD_HARDWARE) command handler */
				blynk_set_handler(client, "vw", vw_handler, NULL);
				blynk_set_handler(client, "vr", vr_handler, NULL);

				blynk_set_handler(client, "pm", pm_handler, NULL);

				blynk_set_handler(client, "dw", dw_handler, NULL);
				blynk_set_handler(client, "dr", dr_handler, NULL);

				state = s_start;
			} else {
				ESP_LOGI("B", "Error init: %d", res);
				state = s_error;
			}
			break;
		}

		case s_start: {
			blynk_err_t res = blynk_start(client);
			if (res == BLYNK_OK) {
				state = s_pulling;
			} else {
				ESP_LOGI("B", "Error start: %d", res);
				state = s_error;
			}
			break;
		}

		case s_pulling: {
			;;;
			break;
		}

		case s_wait:
			if (error)
			{
				// wait polling_ms timeout
				if (is_tickcnt_elapsed(tickcnt, polling_ms))
				{
					state = s_init;
				}
			}
			break;

		case s_error:
			// set error flag
			error = true;
			// clear initialized flag
			initialized = false;
			// get current tickcnt
			tickcnt = get_tickcnt();
			// goto wait and retry with detect state
			state = s_wait;
			break;

	}
}

void Blynk::begin(char *token, char *host, uint16_t port)
{
	strcpy(opt.token, token);
	sprintf(opt.server, "%s:%d", host, port);
}

void Blynk::setVW(uint8_t vp, CallbackFN cb) {
	VWhandler[vp] = cb;
}

void Blynk::setVR(uint8_t vp, CallbackFN cb) {
	VRhandler[vp] = cb;
}

void Blynk::writeVP(uint8_t vp, double data) {
	blynk_send(client, BLYNK_CMD_HARDWARE, 0, "sif", "vw", vp, data);
}

int Blynk::asInt() {
	return atoi(buffVW);
}

double Blynk::asDouble() {
	return atof(buffVW);
}

char* Blynk::asStr() {
	return buffVW;
}

#endif