import { on, once, printConsole } from "skyrimPlatform";
import PluginData from "@/meta/modData";
import { log } from "./utils/consoleLogger";
import GameContext from "./core/gameContext";
import ExampleFeature from "./features/example/exampleFeature";

let context = new GameContext();

once("skyrimLoaded", () => {
  printConsole(`${PluginData.PLUGIN_NAME}`);
  printConsole(`Version ${PluginData.VERSION}`);
});

on("newGame", () => {
  log("NewGame");
  once("update", () => {
    context.Reset();
    init();
  });
});

on("loadGame", () => {
  log("LoadGame");
  context.Reset();
  init();
});

function init(): void {
  context.EnableFeature(new ExampleFeature(context));
}
