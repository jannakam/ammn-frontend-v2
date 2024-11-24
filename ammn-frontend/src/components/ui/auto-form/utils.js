/**
 * Beautify a camelCase string.
 * e.g. "myString" -> "My String"
 */
export function beautifyObjectName(string) {
  // if numbers only return the string
  let output = string.replace(/([A-Z])/g, " $1");
  output = output.charAt(0).toUpperCase() + output.slice(1);
  return output;
}

/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseSchema(schema) {
  if (!schema) return null;
  if ("innerType" in schema._def) {
    return getBaseSchema(schema._def.innerType);
  }
  if ("schema" in schema._def) {
    return getBaseSchema(schema._def.schema);
  }

  return schema;
}

/**
 * Get the type name of the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseType(schema) {
  const baseSchema = getBaseSchema(schema);
  return baseSchema ? baseSchema._def.typeName : "";
}

/**
 * Search for a "ZodDefult" in the Zod stack and return its value.
 */
export function getDefaultValueInZodStack(schema) {
  const typedSchema = schema;

  if (typedSchema._def.typeName === "ZodDefault") {
    return typedSchema._def.defaultValue();
  }

  if ("innerType" in typedSchema._def) {
    return getDefaultValueInZodStack(typedSchema._def.innerType);
  }
  if ("schema" in typedSchema._def) {
    return getDefaultValueInZodStack(typedSchema._def.schema);
  }

  return undefined;
}

/**
 * Get all default values from a Zod schema.
 */
export function getDefaultValues(schema, fieldConfig) {
  if (!schema) return null;
  const { shape } = schema;
  const defaultValues = {};
  if (!shape) return defaultValues;

  for (const key of Object.keys(shape)) {
    const item = shape[key];

    if (getBaseType(item) === "ZodObject") {
      const defaultItems = getDefaultValues(getBaseSchema(item), fieldConfig?.[key]);

      if (defaultItems !== null) {
        for (const defaultItemKey of Object.keys(defaultItems)) {
          const pathKey = `${key}.${defaultItemKey}`;
          defaultValues[pathKey] = defaultItems[defaultItemKey];
        }
      }
    } else {
      let defaultValue = getDefaultValueInZodStack(item);
      if (
        (defaultValue === null || defaultValue === "") &&
        fieldConfig?.[key]?.inputProps
      ) {
        defaultValue = (fieldConfig?.[key]?.inputProps)
          .defaultValue;
      }
      if (defaultValue !== undefined) {
        defaultValues[key] = defaultValue;
      }
    }
  }

  return defaultValues;
}

export function getObjectFormSchema(schema) {
  if (schema?._def.typeName === "ZodEffects") {
    const typedSchema = schema;
    return getObjectFormSchema(typedSchema._def.schema);
  }
  return schema;
}

/**
 * Convert a Zod schema to HTML input props to give direct feedback to the user.
 * Once submitted, the schema will be validated completely.
 */
export function zodToHtmlInputProps(schema) {
  if (["ZodOptional", "ZodNullable"].includes(schema._def.typeName)) {
    const typedSchema = schema;
    return {
      ...zodToHtmlInputProps(typedSchema._def.innerType),
      required: false,
    };
  }
  const typedSchema = schema;

  if (!("checks" in typedSchema._def))
    return {
      required: true,
    };

  const { checks } = typedSchema._def;
  const inputProps = {
    required: true,
  };
  const type = getBaseType(schema);

  for (const check of checks) {
    if (check.kind === "min") {
      if (type === "ZodString") {
        inputProps.minLength = check.value;
      } else {
        inputProps.min = check.value;
      }
    }
    if (check.kind === "max") {
      if (type === "ZodString") {
        inputProps.maxLength = check.value;
      } else {
        inputProps.max = check.value;
      }
    }
  }

  return inputProps;
}

/**
 * Sort the fields by order.
 * If no order is set, the field will be sorted based on the order in the schema.
 */

export function sortFieldsByOrder(fieldConfig, keys) {
  const sortedFields = keys.sort((a, b) => {
    const fieldA = (fieldConfig?.[a]?.order) ?? 0;
    const fieldB = (fieldConfig?.[b]?.order) ?? 0;
    return fieldA - fieldB;
  });

  return sortedFields;
}