import vue from "@vitejs/plugin-vue";
import VueJsx from '@vitejs/plugin-vue-jsx'

import createAutoImport from "./auto-import";
import createSvgIcon from "./svg-icon";
import createCompression from "./compression";
import createSetupExtend from "./setup-extend";


export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue()];
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(createSvgIcon(isBuild));
  vitePlugins.push(VueJsx());
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
}
