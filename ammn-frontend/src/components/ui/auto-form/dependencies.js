import { DependencyType } from "./types";

export default function resolveDependencies(dependencies, currentFieldName, watch) {
  let isDisabled = false;
  let isHidden = false;
  let isRequired = false;
  let overrideOptions;

  const currentFieldValue = watch(currentFieldName);

  const currentFieldDependencies = dependencies.filter((dependency) => dependency.targetField === currentFieldName);
  for (const dependency of currentFieldDependencies) {
    const watchedValue = watch(dependency.sourceField);

    const conditionMet = dependency.when(watchedValue, currentFieldValue);

    switch (dependency.type) {
      case DependencyType.DISABLES:
        if (conditionMet) {
          isDisabled = true;
        }
        break;
      case DependencyType.REQUIRES:
        if (conditionMet) {
          isRequired = true;
        }
        break;
      case DependencyType.HIDES:
        if (conditionMet) {
          isHidden = true;
        }
        break;
      case DependencyType.SETS_OPTIONS:
        if (conditionMet) {
          overrideOptions = dependency.options;
        }
        break;
    }
  }

  return {
    isDisabled,
    isHidden,
    isRequired,
    overrideOptions,
  };
}
