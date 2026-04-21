import GameContext from "./gameContext";

export default abstract class Feature {
  public readonly Name: string;

  protected readonly _gameContext: GameContext;

  public constructor(gameContext: GameContext) {
    this._gameContext = gameContext;
    this.Name = this.constructor.name;
  }

  public abstract Enable(): void;
  public abstract Disable(): void;
}
