import PluginData from "@/meta/pluginData";
import { printConsole } from "skyrimPlatform";

export function log(message: string): void {
  printConsole(`[${PluginData.PLUGIN_NAME}] ${message}`);
}
