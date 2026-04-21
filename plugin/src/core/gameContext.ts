import { EventHandle, unsubscribe } from "skyrimPlatform";
import { EventSubscription } from "./interfaces/eventSubscription";
import Feature from "./feature";
import { log } from "@/utils/consoleLogger";

export default class GameContext {
  private _events: EventSubscription[] = [];
  private _features: Feature[] = [];

  public Reset(): void {
    log("Reset");
    while (this._features.length > 0) {
      this.DisableFeature(this._features[0]);
    }
    while (this._events.length > 0) {
      this.Unsubscribe(this._events[0]);
    }
    this._features = [];
  }
  public SafeSubscribe(event: EventHandle, name: string): void {
    const existed = this._events.find(
      (subscription) => subscription.name === name,
    );

    if (existed !== undefined) {
      log(`Event with name ${name} already exist`);
      unsubscribe(event);
      return;
    }

    this._events.push({
      name: name,
      event: event,
    });
    log(`Event handler ${name} registered for ${event.eventName}`);
  }
  public Unsubscribe(name: string): void;
  public Unsubscribe(event: EventSubscription): void;
  public Unsubscribe(value: string | EventSubscription): void {
    if (typeof value === "string") {
      const item = this._events.find(
        (subscription) => subscription.name === value,
      );

      if (item === undefined) return;

      value = item;
    }

    unsubscribe(value.event);
    this._events = this._events.filter(
      (subscription) => subscription !== value,
    );
    log(`Event handler ${value.name} unsubscribed`);
  }
  public EnableFeature<T extends Feature>(instance: T): void {
    for (let i = 0; i < this._features.length; i++) {
      const feature = this._features[i];
      if (feature.Name === instance.Name) {
        log(`Feature ${instance.Name} already enabled`);
        return;
      }
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
