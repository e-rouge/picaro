import globals from 'globals'
import tseslint from 'typescript-eslint'
import vueEslintConfigTypescript from '@vue/eslint-config-typescript'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
    {
        files: ['**/*.{js,mjs,cjs,ts,vue}']
    },
    {
        ignores: ['**/*.d.ts', '**/coverage', '**/dist', 'eslint.config.mjs', '**/*.cy.ts', '**/*.test.js']
    },
    ...vueEslintConfigTypescript({extends: ['recommendedTypeChecked']}),
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                parser: tseslint.parser,
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            },
            globals: globals.browser
        },
        rules: {
            "no-multi-spaces": "error",
            "vue/html-indent": [
                "error",
                2,
                {
                    "attribute": 1,
                    "baseIndent": 1,
                    "closeBracket": 0,
                    "alignAttributesVertically": true,
                    "ignores": []
                }
            ],
            "vue/multiline-html-element-content-newline": [
                "error",
                {
                    "ignoreWhenEmpty": true,
                    "ignores": [
                        "pre",
                        "textarea"
                    ],
                    "allowEmptyLines": false
                }
            ],
            "@typescript-eslint/ban-ts-comment": "off",
            "vue/v-on-event-hyphenation": "off",
            "@typescript-eslint/no-empty-function": "off",
            "vue/multi-word-component-names": "off",
            "vue/no-v-html": "off",

            "vue/max-attributes-per-line": [
                "error",
                {
                    "singleline": {
                        "max": 7
                    },
                    "multiline": {
                        "max": 1
                    }
                }
            ]
        }
    }
)
