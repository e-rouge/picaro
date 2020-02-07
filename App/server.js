import express from "express";
/*DATABASE INITIALISATION */
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
//rougeFramework own database (parameters, styles, users…)

/* rougeFramework Settings */
import settings from "./../rougeSettings.json";

//rougeFramework UI
import tableToForm from "./formGenerator";
import cssFileGenerator from "./Ui/cssFileGenerator";

//rougeFramework Back End
import crud from "./crud.js";
import appCrud from "./appCrud.js";
import multer from "multer";

/* API TOOLS */
import bodyParser from "body-parser";
import methodOverride from "method-override";

//Authentication
//Todo move authentication in another file
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import initializePassport from "./passportConfig";

const appAdapter = new FileSync("./App/Data/appData.json");
const appDb = low(appAdapter);
//Apps database
const adapter = new FileSync("./App/Data/data.json");
const db = low(adapter);
// @ts-ignore
let currentApplicationSettings = appDb
    .get("config")
    // @ts-ignore
    .find({
        applicationName: settings.defaultApp
    })
    .value();
currentApplicationSettings.applicationName = settings.defaultApp;
const upload = multer();

//Server Params
const port = 8080;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
//Template Engine
app.set("view engine", "pug");

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
    const fs = require("fs");
    app.locals.views = fs.readdirSync(`${__dirname}/../app${currentApplicationSettings.applicationName}/views/`);
    //webpack
    const webpack = require("webpack");
    const config = require("../webpack.config.dev.js");
    const compiler = webpack(config);
    const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);
    // @ts-ignore
    const webpackDevMiddleware = require("webpack-dev-middleware")(compiler, config.devServer);
    //webpack
    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddleware);
}

//Static Files
app.use("/static", express.static("static"));
app.use("/static", express.static("node_modules/normalize.css"));
app.use("/static", express.static("App/Dist"));
app.use("/fonts", express.static("static/fonts"));

app.use("/images", express.static("App/Static/images"));
app.use("/svg", express.static("App/Static/svg"));

//Per apps Static Files
for (let application in settings.applications) {
    app.use(
        // @ts-ignore
        `/${settings.applications[application]}/static`,
        // @ts-ignore
        express.static(`app/${settings.applications[application]}/static`)
    );
}

const api = crud(db);
//TODO bah non en fait… juste pour les "post/put/delete"
app.use("/api", checkAuthenticated, api);
app.use("/edit/:app/:table/:id", function (req, res, next) {
    const data = db
        .get(`${req.params.app}_${req.params.table}`)
        // @ts-ignore
        .find({
            id: req.params.id,
        })
        .value();
    req.params.method = "put";

    req.form = tableToForm(req.params, data);

    next();
});

app.use(
    "/admin/add/:app/:table/",
    /**
     *
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @param {express.Request} req
     *
     */
    function (req, res, next) {
        req.params.method = "post";

        res.locals.form = tableToForm(req.params);

        next();
    }
);
app.get("/edit/:app/:table/:id", function (req, res) {
    app.set("views", `./app${req.params.app}/views`);
    res.render("edit");
});
app.get("/admin/add/:app/:table", function (req, res) {
    app.set("views", `./app${req.params.app}/views`);
    res.render("add");
});
app.use(passport.initialize());
app.use(
    session({
        secret: settings.sessionSecret,
        resave: true,
        saveUninitialized: false,
    })
);

app.use(passport.session());
/**
 *
 * @param {string} value
 * @param {string} type
 * @returns {object} The user data
 */
const getUser = function (value, type = "username") {
    /**
     * @type {object}
     */
    const parameters = {};
    parameters[type] = value;
    return (
        appDb
            .get("users")
            // @ts-ignore
            .find(parameters)
            .value()
    );
};
app.use(flash());

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated() || currentApplicationSettings.devMode) {
        return next();
    }

    res.redirect("/login");
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect(`/${currentApplicationSettings.applicationName}`);
    }
    next();
}

initializePassport(passport, getUser);
app.post(
    "/admin/login",
    checkNotAuthenticated,
    passport.authenticate("local", {
        successRedirect: `/${currentApplicationSettings.applicationName}`,
        failureRedirect: "/admin/login",
        failureFlash: true,
    })
);
app.get("/admin/login", checkNotAuthenticated, function (req, res) {
    app.set("views", `${__dirname}/Views`);
    res.render("login");
});
app.get("/admin/logout", function (req, res) {
    req.logOut();
    res.redirect("/");
});

//Application Data
const appApi = appCrud(appDb, currentApplicationSettings);
app.use("/appapi", appApi);

//TODO generate a default styleset with any app
//All apps middleware
app.use(function (req, res, next) {
    res.locals.environment = process.env.NODE_ENV;
    res.locals.title = currentApplicationSettings.title;
    res.locals.language = currentApplicationSettings.language;
    res.locals.settings = currentApplicationSettings;
    res.locals.appName = currentApplicationSettings.applicationName;
    res.locals.colorSetCollection = JSON.stringify(appDb.get("colorSetPresets").value());

    res.locals.isLogged = currentApplicationSettings.devMode ? true : req.isAuthenticated();

    next();
});
//Development specific stuffs
if (!isProd) {
    app.use(function (req, res, next) {
        const integrationReport = require("./mochawesome.json");
        const unitReport = require("./Tests/jest-results.json");
        const unitEndDate = new Date(unitReport.testResults[0].perfStats.end);
        const unitEnd =
            `${unitEndDate.getDate()}/${unitEndDate.getMonth() + 1} - ${unitEndDate.getHours()}:${unitEndDate.getMinutes()}`;
        const intEndDate = new Date(integrationReport.stats.end);
        const intEnd =
            `${intEndDate.getDate()}/${intEndDate.getMonth() + 1} - ${intEndDate.getHours()}:${intEndDate.getMinutes()}`;

        res.locals.unitEnd = unitEnd;
        res.locals.intEnd = intEnd;
        res.locals.isDev = true;
        res.locals.integrationReport = integrationReport;
        res.locals.unitReport = unitReport;

        next();
    });
}

//TODO add setup. Check initiateApp.js
app.get("/admin/setup", function () {
    appDb.set(currentApplicationSettings.applicationName, []).write();
});

//TODO add put
//TODO should be in appApi
app.post("/admin/settings/:type", upload.none(), function (req, res) {
    if (req.body.styleSet === "") {
        req.body.styleSet = `styleSet-${req.body.id}`;
    }
    if (req.params.type === "overwrite") {
        appDb
            .get(currentApplicationSettings.applicationName)
            // @ts-ignore
            .find({
                id: req.body.id
            })
            .assign(req.body)
            .write();
    } else {
        appDb
            .get(currentApplicationSettings.applicationName)
            // @ts-ignore
            .push(req.body)
            .write();
    }
    cssFileGenerator.generateCSSFile(currentApplicationSettings.applicationName, req.body);

    res.send(`settings for ${currentApplicationSettings.applicationName} saved`);
});

//Pages
app.get("/", function (req, res) {
    app.set("views", `${__dirname}/../app${settings.defaultApp}/views`);
    res.render("index");
});

app.get("/:app", function (req, res) {
    /**
     * @type {string}
     */
    const upperCasedApp = req.params.app.charAt(0).toUpperCase() + req.params.app.slice(1);

    if (upperCasedApp in settings.applications) {
        // @ts-ignore
        currentApplicationSettings = settings.applications[upperCasedApp];
        currentApplicationSettings.applicationName = upperCasedApp;
        app.set("views", `${__dirname}/../app${upperCasedApp}/views`);
        res.render("index");
    } else if (req.params.app !== "admin" || req.params.app !== "__webpack_hmr") {
        res.status(404).send("This page does not exist");
    }
});

app.get("/:app/:view", function (req, res) {
    const upperCasedApp = req.params.app.charAt(0).toUpperCase() + req.params.app.slice(1);
    app.set("views", `${__dirname}/../app${upperCasedApp}/views`);
    res.render(req.params.view);
});

//Server
/* eslint-disable no-console */
app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`connected to port : ${port}`);
    }
});