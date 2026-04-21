import GameContext from "./gameContext";

export default abstract class Feature {
  public abstract readonly Name: string;

  protected readonly _gameContext: GameContext;

  public constructor(gameContext: GameContext) {
    this._gameContext = gameContext;
  }

  public abstract Enable(): void;
  public abstract Disable(): void;
}
