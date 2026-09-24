import LevelMeter from "@/skyrim/ui/levelMeter";

export default class UiProvider {
  private static _levelMeter: LevelMeter | null = null;

  public static get LevelMeter(): LevelMeter {
    return (UiProvider._levelMeter ??= new LevelMeter());
  }
}
