import { EventHandle, unsubscribe } from "skyrimPlatform";

export default abstract class Feature {
  public readonly Name: string;

  private readonly _ownedEvents: EventHandle[] = [];

  public constructor() {
    this.Name = this.constructor.name;
  }

  protected Subscribe(event: EventHandle): void {
    this._ownedEvents.push(event);
  }

  public abstract Enable(): void;

  public Disable(): void {
    for (const event of this._ownedEvents) {
      unsubscribe(event);
    }
    this._ownedEvents.length = 0;
    this.OnDisable();
  }

  protected OnDisable(): void {}
}
