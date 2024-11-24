import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormField } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from "../config";
import {
  beautifyObjectName,
  getBaseSchema,
  getBaseType,
  sortFieldsByOrder,
  zodToHtmlInputProps,
} from "../utils";
import AutoFormArray from "./array";
import resolveDependencies from "../dependencies";

function DefaultParent({
  children
}) {
  return <>{children}</>;
}

export default function AutoFormObject(
  {
    schema,
    form,
    fieldConfig,
    path = [],
    dependencies = []
  }
) {
  const { watch } = useFormContext(); // Use useFormContext to access the watch function

  if (!schema) {
    return null;
  }
  const { shape } = getBaseSchema(schema) || {};

  if (!shape) {
    return null;
  }

  const handleIfZodNumber = (item) => {
    const isZodNumber = (item)._def.typeName === "ZodNumber";
    const isInnerZodNumber =
      (item._def).innerType?._def?.typeName === "ZodNumber";

    if (isZodNumber) {
      (item)._def.coerce = true;
    } else if (isInnerZodNumber) {
      (item._def).innerType._def.coerce = true;
    }

    return item;
  };

  const sortedFieldKeys = sortFieldsByOrder(fieldConfig, Object.keys(shape));

  return (
    (<Accordion type="multiple" className="space-y-5 border-none">
      {sortedFieldKeys.map((name) => {
        let item = shape[name];
        item = handleIfZodNumber(item);
        const zodBaseType = getBaseType(item);
        const itemName = item._def.description ?? beautifyObjectName(name);
        const key = [...path, name].join(".");

        const {
          isHidden,
          isDisabled,
          isRequired: isRequiredByDependency,
          overrideOptions,
        } = resolveDependencies(dependencies, name, watch);
        if (isHidden) {
          return null;
        }

        if (zodBaseType === "ZodObject") {
          return (
            (<AccordionItem value={name} key={key} className="border-none">
              <AccordionTrigger>{itemName}</AccordionTrigger>
              <AccordionContent className="p-2">
                <AutoFormObject
                  schema={item}
                  form={form}
                  fieldConfig={
                    (fieldConfig?.[name] ?? {})
                  }
                  path={[...path, name]} />
              </AccordionContent>
            </AccordionItem>)
          );
        }
        if (zodBaseType === "ZodArray") {
          return (
            (<AutoFormArray
              key={key}
              name={name}
              item={item}
              form={form}
              fieldConfig={fieldConfig?.[name] ?? {}}
              path={[...path, name]} />)
          );
        }

        const fieldConfigItem = fieldConfig?.[name] ?? {};
        const zodInputProps = zodToHtmlInputProps(item);
        const isRequired =
          isRequiredByDependency ||
          zodInputProps.required ||
          fieldConfigItem.inputProps?.required ||
          false;

        if (overrideOptions) {
          item = z.enum(overrideOptions);
        }

        return (
          (<FormField
            control={form.control}
            name={key}
            key={key}
            render={({ field }) => {
              const inputType =
                fieldConfigItem.fieldType ??
                DEFAULT_ZOD_HANDLERS[zodBaseType] ??
                "fallback";

              const InputComponent =
                typeof inputType === "function"
                  ? inputType
                  : INPUT_COMPONENTS[inputType];

              const ParentElement =
                fieldConfigItem.renderParent ?? DefaultParent;

              const defaultValue = fieldConfigItem.inputProps?.defaultValue;
              const value = field.value ?? defaultValue ?? "";

              const fieldProps = {
                ...zodToHtmlInputProps(item),
                ...field,
                ...fieldConfigItem.inputProps,
                disabled: fieldConfigItem.inputProps?.disabled || isDisabled,
                ref: undefined,
                value: value,
              };

              if (InputComponent === undefined) {
                return <></>;
              }

              return (
                (<ParentElement key={`${key}.parent`}>
                  <InputComponent
                    zodInputProps={zodInputProps}
                    field={field}
                    fieldConfigItem={fieldConfigItem}
                    label={itemName}
                    isRequired={isRequired}
                    zodItem={item}
                    fieldProps={fieldProps}
                    className={fieldProps.className} />
                </ParentElement>)
              );
            }} />)
        );
      })}
    </Accordion>)
  );
}
