#ifndef __BLYNK_CLASS_H__
#define __BLYNK_CLASS_H__

#include "driver.h"
#include "device.h"
#include "kidbright32.h"
#include "ht16k33.h"

#include <math.h>
#include <string.h>
#include <inttypes.h>

#include "blynk.h"

typedef void (*CallbackFN)(void);

static CallbackFN VWhandler[256];
static CallbackFN VRhandler[256];

class Blynk : public Device
{
private:
	enum
	{
		s_init,
		s_start,
		s_pulling,
		s_wait,
		s_error
	} state;
	TickType_t tickcnt, polling_tickcnt;

	blynk_client_t *client;
	blynk_options_t opt;

public:
	// constructor
	Blynk();

	// override
	void init(void);
	void process(Driver *drv);
	int prop_count(void);
	bool prop_name(int index, char *name);
	bool prop_unit(int index, char *unit);
	bool prop_attr(int index, char *attr);
	bool prop_read(int index, char *value);
	bool prop_write(int index, char *value);

	// method
	void begin(char *token) { begin(token, "blynk-cloud.com", 8442); } ;
	void begin(char *token, char *host, uint16_t port = 8442) ;
	void setVW(uint8_t vp, CallbackFN cb) ;
	void setVR(uint8_t vp, CallbackFN cb) ;
	void writeVP(uint8_t vp, double data) ;

	int asInt() ;
	double asDouble() ;
	char *asStr() ;

};

#endif