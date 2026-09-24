import PapyrusScript from "@/skyrim/abstractions/papyrusScript";
import { HandSlot } from "@/skyrim/enums/handSlot.enum";
import { SlotMask } from "@/skyrim/enums/slotMask.enum";
import { Actor, Enchantment } from "skyrimPlatform";

// Обёртка над нативным SKSE-скриптом WornObject.
// Сигнатуры: https://ck.uesp.net/wiki/WornObject_Script
export default class WornObject extends PapyrusScript {
  public constructor() {
    super("WornObject");
  }

  public GetEnchantment(actor: Actor, handSlot: HandSlot, slotMask: SlotMask): Enchantment | null {
    return this.CallGlobal("GetEnchantment", actor, handSlot, slotMask) as Enchantment | null;
  }
  public GetItemMaxCharge(actor: Actor, handSlot: HandSlot, slotMask: SlotMask): number {
    return this.CallGlobal("GetItemMaxCharge", actor, handSlot, slotMask) as number;
  }
}
