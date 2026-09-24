import { QuestNotificationType } from "@/skyrim/enums/questNotificationType.enum";
import UiCallback from "@/skyrim/ui/uiCallback";

export default class LevelMeter {
  private static readonly HUD_MENU = "HUD Menu";
  private static readonly SHOW_NOTIFICATION_TARGET =
    "_root.HUDMovieBaseInstance.QuestUpdateBaseInstance.ShowNotification";
  // Непустой текст держит полоску на экране, пока идёт анимация.
  private static readonly TEXT = " ";

  public Show(level: number, oldPercent: number, newPercent: number): void {
    const callback = new UiCallback(
      LevelMeter.HUD_MENU,
      LevelMeter.SHOW_NOTIFICATION_TARGET,
    );

    // Аргументы QuestNotification.ShowNotification в порядке объявления.
    callback.PushString(LevelMeter.TEXT);                     // aNotificationText
    callback.PushString("");                                  // aStatus
    callback.PushString("");                                  // aSoundID
    callback.PushInt(0);                                      // aObjectiveCount
    callback.PushInt(QuestNotificationType.SkillLevelUpdate); // aNotificationType
    callback.PushInt(level);                                  // aLevel
    callback.PushFloat(oldPercent);                           // aStartPercent
    callback.PushFloat(newPercent);                           // aEndPercent
    callback.PushString("");                                  // aDragonText
    callback.Send();
  }
}
