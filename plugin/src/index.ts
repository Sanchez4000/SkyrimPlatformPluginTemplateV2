import { startPlugin } from "@/core/plugin";
import ExampleFeature from "@/features/example/exampleFeature";

startPlugin((context) => {
  // ПРИМЕР: удалите эту строку и добавьте свои фичи
  context.EnableFeature(new ExampleFeature());
});
