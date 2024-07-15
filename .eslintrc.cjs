/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {


  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  plugins: ['import'],
  rules: {
    'import/no-unresolved': 'off', // Disable 'no-unresolved' rule to allow Firebase imports
    // Add specific rules if necessary
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
