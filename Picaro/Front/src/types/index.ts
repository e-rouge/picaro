import {JSONContent} from "@tiptap/core"
import {imageSizeMap} from "@utils/helper";

export type AvailableModules =
    "Layout"
    | "FilterLayout"
    | "FilterLayoutSelect"
    | "List"
    | "FilterCategories"
    | "FilterLink"
    | "Preview"
    | "FilterSingle"
    | "SingleImage"
    | "Video"

export type SingleImageParams = {
    link: string
    image: string
}

export type AvailableContentType = "richText" | 'text' | 'image' | 'videoEmbed'
export type Category = {
    id: string,
    label: string,
    section?: boolean
    model?: string
}
export type Module = {
    model?: string | null,
    type: AvailableModules,
    categories?: Category[]
    cols?: number
    hideOnMobile?: boolean,
    inMobileMenu?: boolean,
    mobileCols?: string
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    content?: any
}

export type AvailableModulesComponentList = Record<AvailableModules, string>


export type Filter = {
    method: FilterMethod,
    target: string,
    value: string[],
    type: string
}

export type ModelFilter = Filter & { modelIdCollection?: string[] }

export type Model = { id: string, name: string, fieldCollection: FieldParams[] }

export type FilterMethod = "eq" | "in" | "fd" | "ly" // equal, in,  ?, layout

export type FilterCollection = {
    all: Filter[],
    modelFilters: ModelFilter[]
}

export type RichTextContent = {
    html: string
    json: JSONContent[]
}


export type RichTextEditorJson = {
    type?: string;
    attrs?: Record<string, unknown>;
    content?: JSONContent[];
    marks?: {
        type: string;
        attrs?: Record<string, unknown>;
        [key: string]: unknown;
    }[];
    text?: string;
    [key: string]: unknown;
};

export type LayoutCollection = {
    id: string,
    name: string,
    order: number,
    layout: Module[][]
}

export type Settings = {
    id: string,
    title: string,
    styleSet: string,
    language: string,
    devMode: boolean,
    categories: Category[],
    messageTimeOut: number,
    applicationName: string,
    navStructure: [],
    layoutCollection: LayoutCollection[],
    layoutLinkCollection: [],
    defaultLayout: string
    layoutCommonCollection: Module[][],
    modelCollection: Model[],
}

export type ColorParameters = {
    hueVariation: number
    saturation?: number
    light?: number
}
export type CssParameters = {
    "font-size"?: string,
    "line-height"?: string,
    "margin-bottom"?: string,
    "margin-top"?: string
}

export type ColorGeneratorParams = {
    count: number,
    text: { variation: number, curve: number, move: number },
    hue: { variation: number, curve: number, move: number },
    light: { variation: number, move: number, curve: number },
    saturation: { variation: number, move: number, curve: number },
    full: boolean,
}

type RatioParams = {
    text: string,
    "margin-top": string,
    "margin-bottom": string,
    "font-size": string,
    "line-height": string
}

export type FontOrigin = "google" | "local" | "webSafe"

export type FontVariantParams = {
    src: string
    style: string
    weight: number
}

export type FontStyleParams = {
    family: string
    variants?: FontVariantParams[]

}

export type FontParams = { font: FontStyleParams, origin: FontOrigin }

export interface SettingsStore {
    currentAppSettings?: Settings
    allSettings: Settings[]
    allStyleSets: StyleSet[]
    currentStyleSet?: StyleSet
}

export type StyleSet = {
    dominant: string,
    colorParameterCollection: ColorParameters[],
    colorGeneratorParams: ColorGeneratorParams,
    selectorCollection: { html: CssParameters },
    'font-size': string,
    id: string,
    setName: string,
    fontFamilyMain: FontParams,
    fontFamilyAlt: FontParams,
    fontFamilyTitle: FontParams,
    ratioCollection: {
        html: {
            "font-size": string,
            "line-height": string
        },
        h1: RatioParams,
        h2: RatioParams,
        h3: RatioParams,
        h4: RatioParams,
        h5: RatioParams,
        h6: RatioParams,
        p: RatioParams,
    },
    hiddenCombination: { dominant: Array<unknown>, sub: Array<unknown> },
}

export type FieldParams = {
    id: string,
    label: string,
    name: string,
    regex: string,
    required: boolean,
    hidden?: boolean,
    template: string,
    attributes: string,
    extraParams?: {
        size?: keyof typeof imageSizeMap
        showFull?: boolean,
    },
    type: AvailableContentType | null
}

export type FieldContentParams = {
    fieldContent: null | string | RichTextContent | string[]
    fieldParamsId: string
    contentId: string
}

export type FilterParams = {
    value: string[]
    target: string
    method: FilterMethod
    type?: string
}

export type ModelContent = {
    categories: string[]
    content: FieldContentParams[]
    modelId: string
    id: string
    status?: ModelContentStatus
    created: Date | null
    updated: Date | null
}

export type ModelContentStatus = 'deleted' | 'archived' | 'draft' | 'published'

export type Hue = { hue: number, saturation: number, light: number }

export type ModelState = "noModel" | "awaitingName" | "modelSelected" | "addingField" | "editingField"

export type ModuleEditParams = {
    name: string
    commonOnly?: boolean
    hideModel?: boolean
    hideCategories?: boolean
    component?: unknown
    plugin?: boolean
}
