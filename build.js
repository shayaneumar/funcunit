var stealTools = require("steal-tools");
var npmUtils =require("steal/ext/npm-utils");
var isNpm = npmUtils.moduleName.isNpm;
var parseModuleName = npmUtils.moduleName.parse;

stealTools.export({
	system: {
		config: __dirname + "/package.json!npm"
	},
	outputs: {
		"+amd": {},
		"+cjs": {},
		"global": {
			modules: ["funcunit"],
			dest: __dirname + "/dist/funcunit.js",
			format: "global",
			normalize: function(depName) {
				if(isNpm(depName)) {
					var parsed = parseModuleName(depName);
					if(parsed.packageName === "jquery") {
						depName = parsed.packageName;
					} else {
						depName = parsed.packageName + "/" + parsed.modulePath;
					}
				}
				return depName;
			},
			exports: {
				"jquery": "jQuery"
			}
		}
	}
}).catch(function(e){
	
	setTimeout(function(){
		throw e;
	},1);
	
});
