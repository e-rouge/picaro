const fs = require('fs');
const path = require('path')

if (!fs.existsSync(path.join(__dirname, "../../static/css/baseStyle-custom.pcss"))) {
    fs.copyFileSync(
        path.join(__dirname, "../../static/css/baseStyle-custom.pcss.sample"),
        path.join(__dirname, "../../static/css/baseStyle-custom.pcss"),
    )
}

if (!fs.existsSync(path.join(__dirname, "../Back/picaro-back.json"))) {
    fs.copyFileSync(
        path.join(__dirname, "../Back/picaro-back.json.sample"),
        path.join(__dirname, "../Back/picaro-back.json"),
    )
}

if (!fs.existsSync(path.join(__dirname, "../../plugins/pluginModules.ts"))) {
    fs.copyFileSync(
        path.join(__dirname, "../../plugins/pluginModules.ts.sample"),
        path.join(__dirname, "../../plugins/pluginModules.ts"),
    )
}
