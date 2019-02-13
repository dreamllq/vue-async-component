module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: false,
        // debug: true,
      },
    ],
  ],
  "plugins": [
    "@babel/transform-runtime",
    ["component", {
      "libraryName": "@360es/esui-components",
      "styleLibraryName": "theme-default"
    }]
  ]
};
