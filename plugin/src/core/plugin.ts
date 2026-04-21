import { on, once, printConsole } from "skyrimPlatform";
import PluginData from "@/meta/pluginData";
import { log } from "@/utils/consoleLogger";
import GameContext from "@/core/gameContext";

export function startPlugin(init: (context: GameContext) => void): void {
  const context = new GameContext();

  once("skyrimLoaded", () => {
    printConsole(`${PluginData.PLUGIN_NAME} v${PluginData.VERSION} by ${PluginData.AUTHOR}`);
  });

  on("newGame", () => {
    log("NewGame");
    once("update", () => {
      context.Reset();
      init(context);
    });
  });

  on("loadGame", () => {
    log("LoadGame");
    context.Reset();
    init(context);
  });
}
