var configFile = require("eslint/lib/config/config-file");
var fs = require("fs");
var rules = require("eslint/lib/rules");
var temp = require("temp").track();
var util = require("eslint/lib/util");

var whitelist = [
  "react",
  "standard",
];

function Config(rawConfig) {
  this.rawConfig = rawConfig;
};

Config.prototype.parse = function() {
  var config = this.rawConfig || '{ "rules": {}, "env": { "es6": true, "browser": true }, "extends": "airbnb" }';
  var path = temp.path("eslintrc");
  fs.writeFileSync(path, config, "utf8");

  try {
    var configContent = configFile.load(path);
    this.loadPlugins(configContent.plugins);

    return configContent;
  } finally {
    temp.cleanup();
  }
};

Config.prototype.isValid = function() {
  try {
    this.parse();
    return true;
  } catch (exception) {
    return false;
  }
};

// Stolen, and modified, from:
// https://github.com/eslint/eslint/blob/72a325ca31be20f7a9695556cb5883cd4e9cce14/lib/cli-engine.js#L110-L136
Config.prototype.requirePlugin = function(pluginName) {
  var pluginNamespace = util.getNamespace(pluginName);
  var pluginNameWithoutNamespace = util.removeNameSpace(pluginName);
  var pluginNameWithoutPrefix = util.removePluginPrefix(
    pluginNameWithoutNamespace
  );

  if (whitelist.indexOf(pluginNameWithoutPrefix) > -1) {
    var plugin = require(
      pluginNamespace +
      util.PLUGIN_NAME_PREFIX +
      pluginNameWithoutPrefix
    );
    // if this plugin has rules, import them
    if (plugin.rules) {
      rules.import(plugin.rules, pluginNameWithoutPrefix);
    }
  }
};

Config.prototype.loadPlugins = function(pluginNames) {
  if (pluginNames) {
    pluginNames.forEach(this.requirePlugin);
  } else {
    return;
  }
};

module.exports = Config;
