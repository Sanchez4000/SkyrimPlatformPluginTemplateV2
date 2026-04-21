import { log } from "@/utils/consoleLogger";
import { Form, Game } from "skyrimPlatform";

export default abstract class Mod {
  private static readonly MOD_NOT_FOUND_INDEX = 0xff;

  private readonly ModPrefix: string;
  private readonly ModName: string;

  public get Name(): string {
    return this.ModName;
  }

  public constructor(name: string) {
    const modIndex = Game.getModByName(name);
    if (modIndex === Mod.MOD_NOT_FOUND_INDEX) {
      const message = `Mod: ${name} is missing`;
      log(message);
      throw new Error(message);
    }

    this.ModName = name;
    const hexIndex = modIndex.toString(16).padStart(2, "0");
    this.ModPrefix = `0x${hexIndex}`;
  }

  protected FormFromId(hexId: string): Form | null {
    const hexSpellId = `${this.ModPrefix}${hexId}`;
    const numericSpellId = parseInt(hexSpellId, 16);
    return Game.getFormEx(numericSpellId);
  }
}
