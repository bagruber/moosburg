export default {
  multipass: true,
  plugins: [
    { name: "preset-default", params: { overrides: {
      cleanupNumericValues: { floatPrecision: 0 },
      convertPathData: { floatPrecision: 0, transformPrecision: 0 },
    } } },
    "removeDimensions",
    { name: "removeAttrs", params: { attrs: "(fill|stroke|style|id|class)" } },
  ],
};
