import { EventHandle } from "skyrimPlatform";
import GameContext from "./gameContext";

export default abstract class Feature {
  public readonly Name: string;

  protected readonly _gameContext: GameContext;
  private readonly _ownedEvents: string[] = [];
  private _subscriptionCounter: number = 0;

  public constructor(gameContext: GameContext) {
    this._gameContext = gameContext;
    this.Name = this.constructor.name;
  }

  protected Subscribe(event: EventHandle): string {
    const name = `${this.Name}_${this._subscriptionCounter++}`;
    this._gameContext.SafeSubscribe(event, name);
    this._ownedEvents.push(name);
    return name;
  }

  public abstract Enable(): void;

  public Disable(): void {
    this.OnDisable();
    for (const name of this._ownedEvents) {
      this._gameContext.Unsubscribe(name);
    }
    this._ownedEvents.length = 0;
    this._subscriptionCounter = 0;
  }

  protected OnDisable(): void {}
}
