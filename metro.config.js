const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = ["tsx", "ts", "jsx", "js", "json", "cjs"];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "nanoid/non-secure" || moduleName.endsWith("/nanoid/non-secure")) {
    return {
      filePath: require.resolve("nanoid/non-secure"),
      type: "sourceFile",
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

config.transformer.minifierConfig = {
  compress: {
    drop_console: true,
    pure_getters: true,
    unsafe_math: true,
  },
};

config.cache = { mode: "memory" };

module.exports = config;