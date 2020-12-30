module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: "element-plus",
        styleLibraryName: "theme-chalk"
      },
      'element-plus'
    ],
    [
      'component',
      {
        libraryName: "lodash",
        style: false,
        camel2Dash: false
      },
      'lodash'
    ]
  ]
}
