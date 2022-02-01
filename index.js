const appstfvars = require("./apps.tfvars.json"); 
const nameservers = require("./nameservers.json");

const fs = require('fs'); 

const env = process.argv.slice(2)[0]
const appName = process.argv.slice(2)[1]

const isAppNameAlreadyExist = !!appstfvars.apps.find(appBlock => {
    return appBlock.name === appName
})

const upsetter = require("./apps.tfvars.json");

if (isAppNameAlreadyExist) {
    const appBlock = appstfvars.apps.filter(({ name }) => name === appName)[0];
    upsetter.apps.splice(upsetter.apps.map(function (item) { return item.name; }).indexOf(appName), 1);
    if (env == "nonprod") {
        upsetter.apps.push({ "name": appName, "nonprod": nameservers.dns, "prod": appBlock.prod });
    } else if (env == "prod") {
        upsetter.apps.push({ "name": appName, "nonprod": appBlock.nonprod, "prod": nameservers.dns });
    } else {
        throw new Error('Environment is neither prod nor nonprod');
    }
} else {
    if (env == "nonprod") {
        upsetter.apps.push({ "name": appName, "nonprod": nameservers.dns, "prod": [] });
    } else if (env == "prod") {
        upsetter.apps.push({ "name": appName, "nonprod": [], "prod": nameservers.dns });
    } else {
        throw new Error('Environment is neither prod nor nonprod');
    }
}
console.log(upsetter);
fs.writeFile("apps.tfvars.json", JSON.stringify(upsetter), function (err) { if (err) throw err; });