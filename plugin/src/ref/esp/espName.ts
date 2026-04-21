import Mod from "@/core/mod";

export default class EspNameMod extends Mod {
  constructor() {
    super("EspName.esp");
  }

  //Различные сущности из подгружаемого файла .esp
  //Пример получения сущности (на примере заклинания)
  //_exampleSpellEditorId: Spell.from(this.GetFormFromFormId("000000")!);
  //Значение "000000" нужно заменить на реальный FormId.
  //Важно, что FormId должен указываться без первых двух знаков справа. Они подставляются автоматически.
  public get Spells() {
    return {};
  }
  public get Globals() {
    return {};
  }
}
