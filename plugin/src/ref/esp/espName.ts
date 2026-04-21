/**
 * ПРИМЕР — этот файл можно удалить.
 *
 * Демонстрирует, как обернуть доступ к формам из ESP-файла.
 * Переименуйте класс и файл, укажите реальное имя ESP,
 * затем добавьте нужные формы через GetFormFromFormId().
 *
 * Если плагин не использует ESP-файлы, удалите этот файл.
 */
import Mod from "@/core/mod";
// import { Spell } from "skyrimPlatform"; // раскомментируйте нужные типы

export default class EspNameMod extends Mod {
  public constructor() {
    super("EspName.esp");
  }

  // Пример геттера (FormId без первых двух знаков слева — индекс мода):
  // public get Spells() {
  //   return {
  //     exampleSpell: Spell.from(this.GetFormFromFormId("000000")),
  //   };
  // }
}
