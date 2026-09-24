import { callNative, PapyrusValue } from "skyrimPlatform";

// Базовый класс обёрток над Papyrus-скриптами с глобальными нативными функциями.
export default abstract class PapyrusScript {
  private readonly _scriptName: string;

  protected constructor(scriptName: string) {
    this._scriptName = scriptName;
  }

  protected CallGlobal(funcName: string, ...args: PapyrusValue[]): PapyrusValue {
    return callNative(this._scriptName, funcName, undefined, ...args);
  }
}
