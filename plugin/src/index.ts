import { on, once, printConsole } from "skyrimPlatform";
import PluginData from "@/meta/modData";
import { log } from "./utils/consoleLogger";
import GameContext from "./core/gameContext";
import GodRegenFeature from "./features/godRegen/godRegenFeature";
import RfabErinRaceFixFeature from "./features/rfabErinRaceFix/rfabErinRaceFix";
import LevelDamageBoostFeature from "./features/levelDamageBoost/levelDamageBoost";
import PlayerEvasionFeature from "./features/playerEvasion/playerEvasionFeature";
import KillSyphonFeature from "./features/killSyphon/killSyphonFeature";
import KillCounterBuffFeature from "./features/killCounterBuff/killCounterBuff";
import FlameEnemyOnHitFeature from "./features/flameEnemyOnHit/flameEnemyOnHitFeature";

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
  //context.EnableFeature(new GodRegenFeature(context));
  context.EnableFeature(new RfabErinRaceFixFeature(context));
  //context.EnableFeature(new LevelDamageBoostFeature(context));
  //context.EnableFeature(new PlayerEvasionFeature(context));
  //context.EnableFeature(new KillSyphonFeature(context));
  //context.EnableFeature(new KillCounterBuffFeature(context));
  //context.EnableFeature(new FlameEnemyOnHitFeature(context));
}
