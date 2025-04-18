const {defaultSettings} = require("./dataConfig");
const {nanoid} = require("nanoid");
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const {dbDeleteItem} = require('./dataUtils')
const {generateCSSFile} = require("./cssFileGenerator");


async function routes(fastify) {
    fastify.get(`/all`, async function () {
        const allSettingsDb = fastify.db.getCollection('settings')
        const allStyleSetsdB = fastify.db.getCollection('styleset')
        return {allSettings: allSettingsDb.find(), allStyleSets: allStyleSetsdB.find()}
    });
    fastify.post(`/create/:name`, {
        preHandler: [fastify.authenticate],
    }, async (request, reply) => {
        const {name} = request.params;

        console.info('creating', name)
        if (!name) {
            return reply.code(400).send({error: 'Missing name'})
        }
        const newApp = fastify.db.getCollection(name)

        if (newApp !== null) {
            console.log(`The app ${name} already exist`)
            return
        }
        const newSettings = {...defaultSettings}
        const appId = nanoid(8)
        try {
            const settings = fastify.db.getCollection('settings')
            newSettings.id = appId
            newSettings.applicationName = name
            settings.insert(newSettings)
            fastify.db.addCollection(appId)
            console.log(`The app ${name} has been created`)
        } catch (err) {
            throw new Error(err)
        }
        reply.send({appCreatedId: appId})
    })
    fastify.put(`/update/settings`, {preHandler: [fastify.authenticate]}, async (request) => {
        try {
            const settings = fastify.db.getCollection('settings')
            settings.update(request.body.settings)

        } catch (err) {
            throw new Error(err)
        }
    })
    fastify.delete(`/delete/:name`, {
        preHandler: [fastify.authenticate],
    }, async (request, reply) => {
        const {name} = request.params;
        const app = fastify.db.getCollection(name)
        if (app === null) {
            reply.send(`The app ${name} doesn't exist`)
        } else {
            try {
                fastify.db.removeCollection(name)
            } catch (err) {
                throw new Error(err)
            }
            dbDeleteItem(name, fastify.db.getCollection('settings'), 'id')
            reply.send(`The app ${name} has been deleted`)
        }
    })
    fastify.post(`/create/styleset`, {
        preHandler: [fastify.authenticate],
    }, async (request) => {

        try {
            const styleset = fastify.db.getCollection('styleset')

            const result = styleset.insert(request.body.styleSet)
            generateCSSFile(request.body.generatedCSS, request.body.styleSet.id)
            console.log(`The style ${request.body.name} has been created`)
            return result
        } catch (err) {
            throw new Error(err)
        }
    })
    fastify.put(`/update/styleset`, {
        preHandler: [fastify.authenticate],
    }, async (request) => {
        try {
            const styleset = fastify.db.getCollection('styleset')
            styleset.update(request.body.styleSet)
            generateCSSFile(request.body.generatedCSS, request.body.styleSet.id)

        } catch (err) {
            throw new Error(err)
        }
    })
    fastify.post('/uploadimages/:type?', {
        prenHandler: [fastify.authenticate],

    }, async (request, reply) => {
        const data = await request.file()
        console.log(data)
        const buffer = await data.toBuffer()
        const dir = `${__dirname}/uploads/${request.params.type ?? ''}`;
        const [name, ext] = data.filename.split('.')

        if (!request.params.type) {
            Object.entries(fastify.conf.imageSize).forEach(([key, value], index) => {
                sharp(buffer)
                    .resize(value)
                    .toFile(`${dir}/${name}-${index}-${key}.${ext}`);
            })
        }

        fs.writeFileSync(`${dir}/${data.filename}`, buffer)
        reply.send({uploaded: true})
    })
    fastify.get('/allimages', {
        preHandler: [fastify.authenticate],
    }, async () => {
        const dir = `${__dirname}/uploads/`;
        const files = fs.readdirSync(dir)
        return files.filter(file => !file.startsWith('.'))
    })
}

module.exports = routes
