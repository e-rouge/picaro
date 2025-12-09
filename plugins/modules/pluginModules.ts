import {ModuleEditParams} from "@types";
import TestLayout from "./testModule/TestLayout.vue";
import TestModule from "./testModule/TestModule.vue";


export const pluginLayoutModules: ModuleEditParams[] = [
    {
        name: "TestModule",
        hideCategories: true,
        plugin: true,
        component: TestLayout
    },
];

export const pluginDisplayModules: Record<string, any> = {
    TestModule: TestModule
}
