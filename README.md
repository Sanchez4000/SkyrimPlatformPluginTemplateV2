# Skyrim Platform Plugin Template V2

Шаблон для создания плагинов на [Skyrim Platform](https://github.com/skyrim-multiplayer/skymp) с использованием TypeScript.

## Содержание

- [Требования](#требования)
- [Начало работы](#начало-работы)
- [Структура проекта](#структура-проекта)
- [Конвенции кода](#конвенции-кода)
- [Создание фичи](#создание-фичи)
- [Работа с ESP-файлами](#работа-с-esp-файлами)
- [Команды сборки](#команды-сборки)

---

## Требования

- [Node.js](https://nodejs.org/) 16+
- [Skyrim Special Edition](https://store.steampowered.com/app/489830/)
- [Skyrim Platform](https://github.com/skyrim-multiplayer/skymp) 2.9.0+

---

## Начало работы

**1. Настроить метаданные плагина** в [plugin/src/meta/modData.ts](plugin/src/meta/modData.ts):

```ts
export default class PluginData {
  public static readonly PLUGIN_NAME = "Мой плагин";
  public static readonly VERSION = "1.0.0";
  public static readonly AUTHOR = "Автор";
}
```

**2. Указать путь к Skyrim.** Скопируйте [plugin/skyrim.example.json](plugin/skyrim.example.json) в `plugin/skyrim.json` и укажите свой путь:

```json
{
  "skyrimFolder": "C:/SteamLibrary/steamapps/common/Skyrim Special Edition"
}
```

`skyrim.json` добавлен в `.gitignore` — личный путь не попадёт в репозиторий.

Альтернатива — передать путь прямо в команде сборки (файл `skyrim.json` при этом не нужен):

```cmd
set SKYRIMPATH=C:\SteamLibrary\steamapps\common\Skyrim Special Edition && npm run dev
```

**3. Запустить режим разработки:**

```bash
cd plugin
npm run dev
```

Это установит зависимости, соберёт плагин и начнёт следить за изменениями файлов, автоматически разворачивая новую версию в `Data/Platform/PluginsDev/`.

---

## Структура проекта

```
plugin/
├── src/
│   ├── core/               ← ядро фреймворка, не изменять
│   │   ├── feature.ts      ← базовый класс Feature
│   │   ├── gameContext.ts  ← менеджер фич
│   │   └── mod.ts          ← базовый класс для работы с ESP
│   │
│   ├── features/           ← здесь создаются фичи плагина
│   │   └── example/
│   │       └── exampleFeature.ts
│   │
│   ├── meta/
│   │   └── modData.ts      ← название, версия, автор плагина
│   │
│   ├── ref/
│   │   └── esp/            ← классы для доступа к формам из ESP-файлов
│   │       └── espName.ts
│   │
│   ├── skyrim/             ← константы и перечисления игры
│   │   └── trackedStat.enum.ts
│   │
│   ├── utils/
│   │   └── consoleLogger.ts  ← логгер, не изменять
│   │
│   └── index.ts            ← точка входа: регистрация фич
│
├── package.json             ← имя выходного файла плагина (поле "name")
├── skyrim.example.json     ← шаблон конфига пути к Skyrim
├── skyrim.json             ← личный конфиг пути (в .gitignore, создать самостоятельно)
├── tsconfig.json           ← не изменять
└── webpack.config.js       ← не изменять
```

### Что изменять

| Путь | Когда изменять |
|---|---|
| `src/meta/modData.ts` | Название, версия, автор плагина |
| `src/index.ts` | Регистрация новых фич через `context.EnableFeature(...)` |
| `src/features/` | Вся игровая логика — здесь создаются новые фичи |
| `src/ref/esp/` | Классы доступа к формам из ESP-файлов |
| `src/skyrim/` | Константы и перечисления для игровых данных |
| `package.json` (поле `"name"`) | Имя выходного `.js`-файла плагина |
| `skyrim.json` | Путь к папке Skyrim (скопировать из `skyrim.example.json`) |

### Что не трогать

| Путь | Причина |
|---|---|
| `src/core/` | Ядро фреймворка — управляет жизненным циклом фич и событий |
| `src/utils/consoleLogger.ts` | Логгер, настроенный под метаданные плагина |
| `tsconfig.json` | Компилятор настроен под требования Skyrim Platform |
| `webpack.config.js` | Сборщик настроен под нужды Skyrim Platform |

---

## Конвенции кода

Проект следует **C#-стилю именования**, поскольку Skyrim Platform API частично ориентирован на разработчиков из экосистемы .NET/Papyrus.

### Именование

| Сущность | Стиль | Пример |
|---|---|---|
| Классы | `PascalCase` | `ExampleFeature`, `GameContext` |
| Публичные методы | `PascalCase` | `Enable()`, `GetFormFromFormId()` |
| Приватные поля | `_camelCase` | `_frameDivider`, `_frameCounter` |
| Публичные свойства (get) | `PascalCase` | `get Name()`, `get Spells()` |
| Локальные переменные | `camelCase` | `modIndex`, `hexId` |
| Файлы классов | `camelCase` | `exampleFeature.ts`, `gameContext.ts` |
| Файлы перечислений | `camelCase.enum.ts` | `trackedStat.enum.ts` |

### Импорты

В проекте настроен алиас `@/` для папки `src/`. Используйте его вместо относительных путей:

```ts
// Хорошо
import Feature from "@/core/feature";
import { log } from "@/utils/consoleLogger";

// Не нужно
import Feature from "../../core/feature";
```

### Логирование

Для вывода в консоль используйте только `log()` из `consoleLogger`. Она автоматически добавляет имя плагина к каждому сообщению:

```ts
import { log } from "@/utils/consoleLogger";

log("Привет"); // Выведет: [Мой плагин] Привет
```

---

## Создание фичи

Вся игровая логика реализуется через классы-наследники `Feature`. Фреймворк автоматически управляет подпиской на события и очисткой ресурсов при перезагрузке.

### Шаг 1 — Создать файл фичи

Создайте файл в `src/features/`. Рекомендуется группировать фичи по папкам:

```
src/features/
└── regen/
    └── healthRegenFeature.ts
```

### Шаг 2 — Реализовать класс

```ts
// src/features/regen/healthRegenFeature.ts
import Feature from "@/core/feature";
import { Actor, Game, on } from "skyrimPlatform";

export default class HealthRegenFeature extends Feature {
  private _frameDivider: number = 60; // каждые 60 кадров (~1 сек при 60 fps)
  private _frameCounter: number = 0;

  public Enable(): void {
    // Subscribe() регистрирует событие и запоминает его для автоматической очистки
    this.Subscribe(on("update", () => this.Update()));
  }

  // Переопределите OnDisable(), если нужна дополнительная очистка при выключении фичи
  protected OnDisable(): void {
    log("HealthRegenFeature выключена");
  }

  private Update(): void {
    this._frameCounter++;
    if (this._frameCounter < this._frameDivider) return;

    this._frameCounter = 0;

    const player = Game.getPlayer();
    if (!player) return;

    player.modActorValue("Health", 5);
  }
}
```

**Важно:** все подписки на события Skyrim Platform делайте только через `this.Subscribe()`, а не напрямую через `on()`. Только тогда фреймворк сможет корректно отписаться от них при `Reset()`.

### Шаг 3 — Зарегистрировать фичу

Добавьте фичу в функцию `init()` в [plugin/src/index.ts](plugin/src/index.ts):

```ts
import HealthRegenFeature from "./features/regen/healthRegenFeature";

function init(): void {
  context.EnableFeature(new ExampleFeature());
  context.EnableFeature(new HealthRegenFeature()); // ← добавить
}
```

`init()` вызывается при загрузке сохранения и при старте новой игры. `GameContext` автоматически предотвращает регистрацию двух фич с одинаковым именем класса.

---

## Работа с ESP-файлами

Если плагин использует формы из ESP-файла (заклинания, NPC, предметы и т.д.), создайте класс-наследник `Mod` в папке `src/ref/esp/`.

> Если плагин не требует ESP-файлов, папка `src/ref/esp/` остаётся пустой.

### Шаг 1 — Создать класс

```ts
// src/ref/esp/myMod.ts
import Mod from "@/core/mod";
import { Spell, GlobalVariable } from "skyrimPlatform";

export default class MyMod extends Mod {
  public constructor() {
    super("MyMod.esp"); // точное имя файла с расширением
  }

  // GetFormFromFormId() принимает FormId без первых двух символов (индекс мода).
  // Например, если полный FormId в xEdit равен 0x01000D62, передайте "000D62".
  public get Spells() {
    return {
      fireballEnhanced: Spell.from(this.GetFormFromFormId("000D62")),
    };
  }

  public get Globals() {
    return {
      regenMultiplier: GlobalVariable.from(this.GetFormFromFormId("000A1B")),
    };
  }
}
```

Если ESP-файл не загружен в игре, конструктор выбросит ошибку. `GameContext` перехватит её и не зарегистрирует фичу, которая пыталась создать этот объект.

### Шаг 2 — Использовать в фиче

```ts
import Feature from "@/core/feature";
import MyMod from "@/ref/esp/myMod";
import { Game, on } from "skyrimPlatform";

export default class MyFeature extends Feature {
  private _mod: MyMod;

  public Enable(): void {
    this._mod = new MyMod();
    this.Subscribe(on("update", () => this.Update()));
  }

  private Update(): void {
    const spell = this._mod.Spells.fireballEnhanced;
    // ...
  }
}
```

---

## Команды сборки

Все команды выполняются из папки `plugin/`.

| Команда | Описание |
|---|---|
| `npm run dev` | Установить зависимости + собрать + следить за изменениями |
| `npm run webpack` | Разовая сборка в папку `build/` |
| `npm run webpack:deploy` | Сборка + копирование в `Data/Platform/PluginsDev/` |
| `npm run webpack:deploy:watch` | То же, но с отслеживанием изменений |
| `npm run zip` | Сборка + создание `.zip` для публикации на NexusMods |

Имя выходного файла определяется полем `"name"` в `package.json`.
