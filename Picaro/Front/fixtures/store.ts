import {Settings, SettingsStore} from "@types";

export const currentAppSettings = {
    id: "hWvJzKOX",
    styleSet: "styleId",
    language: "",
    title: "doc",
    devMode: true,
    messageTimeOut: 10000,
    applicationName: "picaro",
    navStructure: [],
    layoutCollection: [{
        name: "blog",
        id: "h2fFurQB-2LFRbVHnF-Pk",
        order: 1,
        layout: [[{
            model: "1QKpueEa", type: "List", categories: []
        }]]
    }],
    layoutLinkCollection: [],
    defaultLayout: "h2fFurQB-2LFRbVHnF-Pk",
    layoutCommonCollection: [[{
        type: "FilterCategories", cols: "2"
    }, {
        type: "List", model: "1QKpueEa"
    }]],
    modelCollection: [{
        id: "modelId1",
        name: "article",
        fieldCollection: [{
            id: "bjP_lt",
            type: "richText",
            name: "article",
            label: "article",
            template: "",
            attributes: "",
            required: false,
            regex: "",
            extraParams: {}
        }, {
            id: "modelId2",
            type: "text",
            name: "title",
            label: "title",
            template: "",
            attributes: "",
            required: false,
            regex: "",
            extraParams: {}
        }]
    }],
    categories: []
} satisfies Settings

export const settingsStoreFixtureNoCurrent: SettingsStore = {
    allStyleSets: [
        {
            dominant: "#00B4F0",
            colorParameterCollection: [{
                hueVariation: -155
            }, {

                hueVariation: 9, light: 19
            }, {
                hueVariation: -170,
                light: 33
            }],
            colorGeneratorParams: {
                count: 10,
                text: {
                    variation: 4, curve: 0, move: 0
                },
                hue: {
                    variation: 2, curve: 0, move: 0
                },
                light: {
                    variation: 6, move: 7, curve: 5
                },
                saturation: {
                    variation: 8, move: -4, curve: 0
                },
                full: false
            },
            selectorCollection: {
                html: {}
            },
            "font-size": "16px",
            id: "JU7YEogt",
            setName: "default",
            fontFamilyMain: {
                font: {
                    family: "Knile",
                    variants: [
                        {
                            src: "Knile-Black-Italic.otf",
                            style: "italic",
                            weight: 900
                        },
                        {
                            src: "Knile-Black.otf", style: "normal", weight: 900
                        }, {
                            src: "Knile-Bold-Italic.otf",
                            style: "italic",
                            weight: 700
                        },
                        {
                            src: "Knile-Bold.otf", style: "normal", weight: 700
                        }, {
                            src: "Knile-ExtraLight-Italic.otf",
                            style: "italic",
                            weight: 200
                        },
                        {
                            src: "Knile-ExtraLight.otf", style: "normal", weight: 200
                        }, {
                            src: "Knile-Light-Italic.otf",
                            style: "italic",
                            weight: 300
                        },
                        {
                            src: "Knile-Light.otf", style: "normal", weight: 300
                        }, {
                            src: "Knile-Medium-Italic.otf",
                            style: "italic",
                            weight: 500
                        },
                        {
                            src: "Knile-Medium.otf", style: "normal", weight: 500
                        }, {
                            src: "Knile-Regular-Italic.otf",
                            style: "italic",
                            weight: 400
                        },
                        {
                            src: "Knile-Regular.otf", style: "normal", weight: 400
                        }, {
                            src: "Knile-SemiBold-Italic.otf",
                            style: "italic",
                            weight: 600
                        },
                        {
                            src: "Knile-SemiBold.otf", style: "normal", weight: 600
                        }, {
                            src: "Knile-Thin-Italic.otf",
                            style: "italic",
                            weight: 100
                        },
                        {
                            src: "Knile-Thin.otf", style: "normal", weight: 100
                        }]
                },
                origin: "local"
            },
            fontFamilyAlt: {
                font: {
                    family: "Courier New"
                },
                origin: "webSafe"
            },
            fontFamilyTitle: {
                font: {
                    family: "TallAbbeyRg",
                    variants: [{
                        src: "TallAbbeyRg.otf", style: "normal", weight: 400
                    }]
                }, origin: "local"
            },
            ratioCollection: {
                h1: {
                    text: "header 1",
                    "margin-top": "1.6",
                    "margin-bottom": "2",
                    "font-size": "4.2",
                    "line-height": "4.2"
                },
                h2: {
                    text: "header 2", "margin-top": "1.3", "margin-bottom": "2", "font-size": "3", "line-height": "3"
                },
                h3: {
                    text: "header 3", "margin-top": "0", "margin-bottom": "1.3", "font-size": "2", "line-height": "3"
                },
                h4: {
                    text: "header 4",
                    "margin-top": "0",
                    "margin-bottom": "1.3",
                    "font-size": "1.6",
                    "line-height": "2"
                },
                h5: {
                    text: "header 5", "margin-top": "0", "margin-bottom": "1.3", "font-size": "1", "line-height": "1"
                },
                h6: {
                    text: "header 6", "margin-top": "0", "margin-bottom": "0", "font-size": "1", "line-height": "1"
                },
                p: {
                    "line-height": "1.5", "font-size": "1", "margin-bottom": "0", "margin-top": "0", text: "base text"
                },
                html: {
                    "line-height": "30", "font-size": "20"
                }
            },
            hiddenCombination: {
                dominant: [], sub: [[], [], []]
            },
        }],
    allSettings: [
        {
            id: "app",
            styleSet: "JU7YEogt",
            language: "",
            title: "doc",
            devMode: true,
            messageTimeOut: 10000,
            applicationName: "picaro",
            navStructure: [],
            layoutCollection: [{
                order: 0,
                name: "blog",
                id: "h2fFurQB-2LFRbVHnF-Pk",
                layout: [
                    [
                        {
                            model: "1QKpueEa",
                            type: "List",
                            categories: []
                        }
                    ]
                ]
            }],
            layoutLinkCollection: [],
            defaultLayout: "h2fFurQB-2LFRbVHnF-Pk",
            layoutCommonCollection: [
                [
                    {
                        type: "FilterCategories", cols: "2",
                    },
                    {
                        type: "List", model: "1QKpueEa"
                    }
                ]
            ],
            modelCollection: [{
                id: "modelId1",
                name: "article",
                fieldCollection: [{
                    id: "bjP_lt",
                    type: "richText",
                    name: "article",
                    label: "article",
                    template: "",
                    attributes: "",
                    required: false,
                    regex: "",
                    extraParams: {}
                }, {
                    id: "modelId2",
                    type: "text",
                    name: "title",
                    label: "title",
                    template: "",
                    attributes: "",
                    required: false,
                    regex: "",
                    extraParams: {}
                }]
            }],
            categories: [{
                label: "What is Picaro ?", id: "vDgCRQNB"
            }, {
                label: "get started",
                id: "k1Og1-0FXcKC8eDnlRMn3"
            }, {
                label: "Create your App", id: "section"
            }]
        },
        {
            id: "app2",
            styleSet: "lMORzfZH",
            language: "",
            title: "testthree",
            categories: [],
            devMode: true,
            messageTimeOut: 10001,
            applicationName: "testthree",
            navStructure: [],
            layoutCollection: [],
            layoutLinkCollection: [],
            defaultLayout: "",
            layoutCommonCollection: [],
            modelCollection: [],
        },

    ],
}

export const settingsStoreFixture = {
    ...settingsStoreFixtureNoCurrent,
    currentAppSettings: currentAppSettings

} satisfies SettingsStore


