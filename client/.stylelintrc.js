module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'font-weight-notation': 'numeric',
    'rule-empty-line-before': 'always',
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': null,
  },
};
