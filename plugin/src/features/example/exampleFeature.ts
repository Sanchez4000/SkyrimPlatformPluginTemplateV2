import Feature from "@/core/feature";
import { Game, on } from "skyrimPlatform";

export default class ExampleFeature extends Feature {
  private _frameDivider: number = 30;
  private _frameCounter: number = 0;

  public Enable(): void {
    this.Subscribe(on("update", () => this.Update()));
  }

  private Update(): void {
    this._frameCounter++;
    if (this._frameCounter >= this._frameDivider) {
      this._frameCounter = 0;
      Game.getPlayer()?.modActorValue("Health", 1);
    }
  }
}
