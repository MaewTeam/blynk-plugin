Blockly.Blocks['blynk_begin'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BYLNK_BEGIN_MESSAGE + "  token:")
      .appendField(new Blockly.FieldTextInput(""), "auth");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(165);
    this.setTooltip(Blockly.Msg.BYLNK_BEGIN_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['blynk_begin_wifi_local_server'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BYLNK_BEGIN_MESSAGE + "  token:")
      .appendField(new Blockly.FieldTextInput(""), "auth")
      .appendField("host:")
      .appendField(new Blockly.FieldTextInput(""), "host")
      .appendField("port:")
      .appendField(new Blockly.FieldNumber(8442, 1, 99999), "port");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(165);
    this.setTooltip(Blockly.Msg.BYLNK_BEGIN_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['blynk_write'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BYLNK_WRITE_1_MESSAGE)
      .appendField(new Blockly.FieldDropdown([
        ["V0", "0"], ["V1", "1"], ["V2", "2"], ["V3", "3"], ["V4", "4"], ["V5", "5"], ["V6", "6"], ["V7", "7"], ["V8", "8"], ["V9", "9"], ["V10", "10"],
        ["V11", "11"], ["V12", "12"], ["V13", "13"], ["V14", "14"], ["V15", "15"], ["V16", "16"], ["V17", "17"], ["V18", "18"], ["V19", "19"], ["V20", "20"],
        ["V21", "21"], ["V22", "22"], ["V23", "23"], ["V24", "24"], ["V25", "25"], ["V26", "26"], ["V27", "27"], ["V28", "28"], ["V29", "29"], ["V30", "30"],
        ["V31", "31"], ["V32", "32"], ["V33", "33"], ["V34", "34"], ["V35", "35"], ["V36", "36"], ["V37", "37"], ["V38", "38"], ["V39", "39"], ["V40", "40"],
        ["V41", "41"], ["V42", "42"], ["V43", "43"], ["V44", "44"], ["V45", "45"], ["V46", "46"], ["V47", "47"], ["V48", "48"], ["V49", "49"], ["V50", "50"]
      ]), "vpin")
      .appendField(Blockly.Msg.BYLNK_WRITE_2_MESSAGE);
    this.appendStatementInput("statement")
      .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(165);
    this.setTooltip(Blockly.Msg.BYLNK_WRITE_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['blynk_param_int'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BYLNK_PARAM_INT_MESSAGE);
    this.setOutput(true, ["int", "Number"]);
    this.setColour(165);
    this.setTooltip(Blockly.Msg.BYLNK_PARAM_INT_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['blynk_param_double'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BYLNK_PARAM_DOUBLE_MESSAGE);
    this.setOutput(true, ["double", "Number"]);
    this.setColour(165);
    this.setTooltip(Blockly.Msg.BYLNK_PARAM_DOUBLE_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['blynk_param_str'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BYLNK_PARAM_STR_MESSAGE);
    this.setOutput(true, "String");
    this.setColour(165);
    this.setTooltip(Blockly.Msg.BYLNK_PARAM_STR_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['blynk_push_data'] = {
  init: function () {
    this.appendValueInput("data")
      .setCheck(["Boolean", "String", "Number"])
      .appendField(Blockly.Msg.BYLNK_PUSH_DATA_MESSAGE)
      .appendField(new Blockly.FieldDropdown([
        ["V0", "0"], ["V1", "1"], ["V2", "2"], ["V3", "3"], ["V4", "4"], ["V5", "5"], ["V6", "6"], ["V7", "7"], ["V8", "8"], ["V9", "9"], ["V10", "10"],
        ["V11", "11"], ["V12", "12"], ["V13", "13"], ["V14", "14"], ["V15", "15"], ["V16", "16"], ["V17", "17"], ["V18", "18"], ["V19", "19"], ["V20", "20"],
        ["V21", "21"], ["V22", "22"], ["V23", "23"], ["V24", "24"], ["V25", "25"], ["V26", "26"], ["V27", "27"], ["V28", "28"], ["V29", "29"], ["V30", "30"],
        ["V31", "31"], ["V32", "32"], ["V33", "33"], ["V34", "34"], ["V35", "35"], ["V36", "36"], ["V37", "37"], ["V38", "38"], ["V39", "39"], ["V40", "40"],
        ["V41", "41"], ["V42", "42"], ["V43", "43"], ["V44", "44"], ["V45", "45"], ["V46", "46"], ["V47", "47"], ["V48", "48"], ["V49", "49"], ["V50", "50"]
      ]), "vpin");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(165);
    this.setTooltip(Blockly.Msg.BYLNK_PUSH_DATA_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['blynk_read'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BYLNK_READ_1_MESSAGE)
      .appendField(new Blockly.FieldDropdown([
        ["V0", "0"], ["V1", "1"], ["V2", "2"], ["V3", "3"], ["V4", "4"], ["V5", "5"], ["V6", "6"], ["V7", "7"], ["V8", "8"], ["V9", "9"], ["V10", "10"],
        ["V11", "11"], ["V12", "12"], ["V13", "13"], ["V14", "14"], ["V15", "15"], ["V16", "16"], ["V17", "17"], ["V18", "18"], ["V19", "19"], ["V20", "20"],
        ["V21", "21"], ["V22", "22"], ["V23", "23"], ["V24", "24"], ["V25", "25"], ["V26", "26"], ["V27", "27"], ["V28", "28"], ["V29", "29"], ["V30", "30"],
        ["V31", "31"], ["V32", "32"], ["V33", "33"], ["V34", "34"], ["V35", "35"], ["V36", "36"], ["V37", "37"], ["V38", "38"], ["V39", "39"], ["V40", "40"],
        ["V41", "41"], ["V42", "42"], ["V43", "43"], ["V44", "44"], ["V45", "45"], ["V46", "46"], ["V47", "47"], ["V48", "48"], ["V49", "49"], ["V50", "50"]
      ]), "vpin")
      .appendField(Blockly.Msg.BYLNK_READ_2_MESSAGE);
    this.appendStatementInput("statement")
      .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(165);
    this.setTooltip(Blockly.Msg.BYLNK_READ_TOOLTIP);
    this.setHelpUrl("");
  }
};
