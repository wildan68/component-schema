import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import antfu from '@antfu/eslint-config-vue'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    // indent 2 spaces
    rules: {
      ...antfu.rules,
      indent: ['error', 2],
      '@typescript-eslint/no-empty-object-type': 'off',
      'vue/max-attributes-per-line': ['error', {
        'singleline': {
          'max': 1
        },      
        'multiline': {
          'max': 1
        }
      }]
    }
  }
]
