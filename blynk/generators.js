const BLYNK_BEGIN = "DEV_IO.Blynk()";

Blockly.JavaScript['blynk_begin'] = function (block) {
  var text_auth = block.getFieldValue('auth');
  var code = `${BLYNK_BEGIN}.begin("${text_auth}");\n`;
  return code;
};

Blockly.JavaScript['blynk_begin_wifi_local_server'] = function (block) {
  var text_auth = block.getFieldValue('auth');
  var text_host = block.getFieldValue('host');
  var number_port = block.getFieldValue('port');
  var code = `${BLYNK_BEGIN}.begin("${text_auth}", "${text_host}", ${number_port});\n`;
  return code;
};

Blockly.JavaScript['blynk_write'] = function (block) {
  var dropdown_vpin = block.getFieldValue('vpin');
  var statements_statement = Blockly.JavaScript.statementToCode(block, 'statement');
  var code = `${BLYNK_BEGIN}.setVW(${dropdown_vpin}, []() { ${statements_statement} });\n`;
  return code;
};

Blockly.JavaScript['blynk_param_int'] = function (block) {
  var code = `${BLYNK_BEGIN}.asInt()`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['blynk_param_double'] = function (block) {
  var code = `${BLYNK_BEGIN}.asDouble()`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['blynk_param_str'] = function (block) {
  var code = `${BLYNK_BEGIN}.asStr()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['blynk_push_data'] = function (block) {
  var dropdown_vpin = block.getFieldValue('vpin');
  var value_name = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${BLYNK_BEGIN}.writeVP(${dropdown_vpin}, ${value_name});\n`;
  return code;
};

Blockly.JavaScript['blynk_read'] = function (block) {
  var dropdown_vpin = block.getFieldValue('vpin');
  var statements_statement = Blockly.JavaScript.statementToCode(block, 'statement');
  var code = `${BLYNK_BEGIN}.setVR(${dropdown_vpin}, []() { ${statements_statement} });\n`;
  return code;
};