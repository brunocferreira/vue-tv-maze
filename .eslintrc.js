module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
    requireConfigFile: false // Adicione esta linha
  },
  extends: [
    'plugin:vue/vue3-recommended'
    // outras extensões...
  ],
  plugins: ['vue'],
  // outras configurações do ESLint...
  rules: {
    'vue/html-self-closing': 'off'
    // outras regras...
  }
};
