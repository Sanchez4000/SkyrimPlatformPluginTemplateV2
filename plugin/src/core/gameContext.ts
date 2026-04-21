import Feature from "./feature";
import { log } from "@/utils/consoleLogger";

export default class GameContext {
  private _features: Feature[] = [];

  public Reset(): void {
    log("Reset");
    while (this._features.length > 0) {
      this.DisableFeature(this._features[0]);
    }
  }

  public EnableFeature(instance: Feature): void {
    if (this._features.some((f) => f.Name === instance.Name)) {
      log(`Feature ${instance.Name} already enabled`);
      return;
    }

    try {
      instance.Enable();
      this._features.push(instance);
      log(`Feature ${instance.Name} enabled`);
    } catch (e) {
      log(`Error enabling feature ${instance.Name}: ${e}`);
    }
  }

  public DisableFeature(feature: Feature): void {
    this._features = this._features.filter((f) => f !== feature);
    feature.Disable();
    log(`Feature ${feature.Name} disabled`);
  }
}
