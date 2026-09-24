import PapyrusScript from "@/skyrim/abstractions/papyrusScript";
import { PapyrusValue } from "skyrimPlatform";

// Обёртка над нативным SKSE-скриптом UICallback.
// Сигнатуры: https://github.com/ianpatt/skse64/blob/master/scripts/modified/UICallback.psc
export default class UiCallback extends PapyrusScript {
  private readonly _handle: number;

  public constructor(menuName: string, target: string) {
    super("UICallback");
    this._handle = this.CallGlobal("Create", menuName, target) as number;
    if (this._handle === 0) {
      throw new Error(`UICallback.Create failed: ${menuName}, ${target}`);
    }
  }

  public PushInt(value: number): void {
    this.Call("PushInt", value);
  }
  public PushFloat(value: number): void {
    this.Call("PushFloat", value);
  }
  public PushString(value: string): void {
    this.Call("PushString", value);
  }
  public Send(): boolean {
    return this.Call("Send") as boolean;
  }

  private Call(funcName: string, ...args: PapyrusValue[]): PapyrusValue {
    return this.CallGlobal(funcName, this._handle, ...args);
  }
}
