function AutoFormTooltip({
  fieldConfigItem
}) {
  return (<>
    {fieldConfigItem?.description && (
      <p className="text-sm text-gray-500 dark:text-white">
        {fieldConfigItem.description}
      </p>
    )}
  </>);
}

export default AutoFormTooltip;
