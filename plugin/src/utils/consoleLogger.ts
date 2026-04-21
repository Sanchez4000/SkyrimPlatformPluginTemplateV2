import PluginData from "@/meta/modData";
import { printConsole } from "skyrimPlatform";

export function log(message: string): void {
  printConsole(`[${PluginData.PLUGIN_NAME}] ${message}`);
}
