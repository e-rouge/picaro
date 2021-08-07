import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import {generateCSSFile} from "./Ui/cssFileGenerator";
import {configModel, validateData} from "./utils";
import globalSettings, {defaultApp, activeApps} from "../rougeSettings.json"

const upload = multer();


export default function settingCrud(appDb, app) {
    const dataRouter = express.Router();
    dataRouter.route("/all/").get(function (req, res) {
        res.json(appDb.find());
    });

    dataRouter
        .route("/settings/:app?")
        .get(function (req, res) {
            if(req.params.app && !activeApps.includes(req.params.app)) {
                return res.status(404).send("This app doesn't exist");
            } else {
                res.json(appDb.findOne({applicationName: req.params.app || app.get('appName') }));
            }
        })
        .put(upload.none(), function (req, res) {
            let errors = validateData(configModel, req.body);
            if (!errors) {
                appDb
                    .get("config")
                    .find({id: defaultApp})
                    .assign(req.body)
                    .write();
                res.send("Config modified successfully");
            } else {
                return res.status(500).send(errors);
            }
        });
    dataRouter.route("/").get(function (req, res) {
        /**
         * @type {object}
         */
        let data = appDb.find({_id: defaultApp.styleSet});
        if (!data) {
            res.status(404).send(`No style collection named ${req.params.styleId}`);
        }
        data.storedColorSet = appDb.find({id: data.colorCombinationId});
        res.json(data);
    }).post((req, res) => {
        if (req.body.styleSet === "") {
            req.body.styleSet = `styleSet-${req.body.id}`;
        }

        appDb
            .get(defaultApp.applicationName)
            // @ts-ignore
            .push(req.body)
            .write();

        //TODO don't saveStyleSet if this fails
        generateCSSFile(defaultApp.applicationName, req.body);

        res.send(`settings for ${defaultApp.applicationName} saved`);
    });
    dataRouter.route("/overwrite").post((req, res) => {
        appDb
            .get(defaultApp.applicationName)
            .find({
                id: req.body.id
            })
            .assign(req.body)
            .write();
        res.send(`StyleSet ${req.body.id} for ${defaultApp.applicationName} updated`);

    });
    dataRouter.route("/fonts").get((req, res) => {
        const directoryPath = path.join(__dirname, "../static/fonts");
        /**
         * @type {array}
         */
        const localFonts = [];
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                res.status(403).send(`The fonts could not be found ${err}`);
            }
            files.forEach(function (file) {
                localFonts.push({family: file});
            });
            res.json(localFonts);
        });
    });
    dataRouter
        .route("/:styleId/")
        .get(function (req, res) {
            /**
             * @type {object}
             */
            let data = appDb.get(defaultApp.applicationName).find({id: req.params.styleId}).value();
            if (!data.styleCollection) {
                res.status(404).send(`No style collection named ${req.params.styleId}`);
            }
            data.storedColorSet = appDb
                .get("colorSetPresets")
                .find({id: data.styleCollection.colorCombinationId})
                .value();
            res.json(data);
        })
        .delete(function (req, res) {
            //TODO double check this can't be done without being logged
            if (appDb.get(defaultApp.applicationName).find({id: req.params.styleId}).value()) {
                appDb.get(defaultApp.applicationName).remove({id: req.params.styleId}).write();
                res.send(`styleset ${req.params.styleId} DELETED`);
            } else {
                res.status(500).send("This style set does not exist or has already been deleted");
                return false;
            }
        });

    return dataRouter;
};
