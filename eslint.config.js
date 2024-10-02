import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default [
      { languageOptions: { globals: globals.browser } },
      pluginJs.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylisticTypeChecked,
      ...pluginVue.configs['flat/essential'],
      { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
      {
            files: ['**/*.{js,mjs,cjs,ts,vue}'],
            rules: {
                  // 小要求
                  'max-depth': [2, 3],
                  'prefer-const': 2,
                  'no-extra-bind': 2,
                  'no-shadow': 2,
                  'no-useless-return': 2,
                  'no-var': 2,
                  'no-else-return': 2,
                  'no-empty-character-class': 2,
                  'no-eq-null': 2,
                  'no-lone-blocks': 2,
                  'no-eval': 2,
                  'no-extra-semi': 1,
                  'no-multi-spaces': 1,
                  'no-mixed-spaces-and-tabs': 1,
                  'no-cond-assign': 0,
                  eqeqeq: [2, 'always'],
                  'no-multiple-empty-lines': [1, { max: 1, maxEOF: 0 }],
                  'no-trailing-spaces': [1, { skipBlankLines: true }],
                  'no-extra-parens': [1, 'all', { returnAssign: false }],
                  // 小毛病
                  'no-duplicate-imports': 2,
                  'no-inner-declarations': 2,
                  'no-self-compare': 2,
                  'no-template-curly-in-string': 2,
                  'no-unreachable-loop': 2,
                  'no-use-before-define': 2,
                  camelcase: 2,
                  'default-param-last': 2,
                  'dot-notation': 2,
                  // ts-eslint
                  '@typescript-eslint/no-unused-expressions': 0
            }
      }
];
