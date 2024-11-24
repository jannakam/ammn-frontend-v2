"use client";;
import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import AutoFormObject from "./fields/object";
import { getDefaultValues, getObjectFormSchema } from "./utils";

export function AutoFormSubmit({
  children,
  className,
  disabled
}) {
  return (
    (<Button type="submit" disabled={disabled} className={className}>
      {children ?? "Submit"}
    </Button>)
  );
}

function AutoForm(
  {
    formSchema,
    values: valuesProp,
    onValuesChange: onValuesChangeProp,
    onParsedValuesChange,
    onSubmit: onSubmitProp,
    fieldConfig,
    children,
    className,
    dependencies
  }
) {
  const objectFormSchema = getObjectFormSchema(formSchema);
  const defaultValues =
    getDefaultValues(objectFormSchema, fieldConfig);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? undefined,
    values: valuesProp,
  });

  function onSubmit(values) {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      onSubmitProp?.(parsedValues.data, form);
    }
  }

  React.useEffect(() => {
    const subscription = form.watch((values) => {
      onValuesChangeProp?.(values, form);
      const parsedValues = formSchema.safeParse(values);
      if (parsedValues.success) {
        onParsedValuesChange?.(parsedValues.data, form);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, formSchema, onValuesChangeProp, onParsedValuesChange]);

  const renderChildren =
    typeof children === "function"
      ? children(form.formState)
      : children;

  return (
    (<div className="w-full">
      <Form {...form}>
        <form
          noValidate
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e);
          }}
          className={cn("space-y-5", className)}>
          <AutoFormObject
            schema={objectFormSchema}
            form={form}
            dependencies={dependencies}
            fieldConfig={fieldConfig} />

          {renderChildren}
        </form>
      </Form>
    </div>)
  );
}

export default AutoForm;
