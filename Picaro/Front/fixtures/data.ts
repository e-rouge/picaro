import {ModelContent} from "@types";

export const modelCollection: ModelContent[] = [
    {
        categories: ['cat1', 'cat2'],
        content: [
            {
                fieldContent: 'test',
                fieldParamsId: 'fieldId',
                contentId: 'contentId'
            }
        ],
        status: "published",
        modelId: "model1",
        created: null,
        updated: null,
        id: "id1"
    },
    {
        categories: ['cat1'],
        content: [
            {
                fieldContent: 'test',
                fieldParamsId: 'fieldId',
                contentId: 'contentId'
            },
            {
                fieldContent: 'test id 2',
                fieldParamsId: 'fieldId2',
                contentId: 'contentId2'
            }
        ],
        status: "published",
        modelId: "model1",
        created: null,
        updated: null,
        id: "id2"
    },
    {
        categories: ['cat3'],
        content: [
            {
                fieldContent: 'test 2',
                fieldParamsId: 'fieldId2',
                contentId: 'contentId'
            }
        ],
        status: "published",
        modelId: "model1",
        created: null,
        updated: null,
        id: "id3"
    },
    {
        categories: ['cat3'],
        content: [
            {
                fieldContent: 'test 3',
                fieldParamsId: 'fieldId3',
                contentId: 'contentId'
            }
        ],
        status: "published",
        modelId: "model1",
        created: null,
        updated: null,
        id: "id4"
    },
]
