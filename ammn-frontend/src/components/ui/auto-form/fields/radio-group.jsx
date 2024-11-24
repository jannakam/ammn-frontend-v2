import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { getBaseSchema } from "../utils";

export default function AutoFormRadioGroup({
  label,
  isRequired,
  field,
  zodItem,
  fieldProps,
  fieldConfigItem
}) {
  const baseValues = (getBaseSchema(zodItem))._def
    .values;

  let values = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues).map((item) => item[0]);
  } else {
    values = baseValues;
  }

  return (
    (<div>
      <FormItem>
        <AutoFormLabel label={fieldConfigItem?.label || label} isRequired={isRequired} />
        <FormControl>
          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} {...fieldProps}>
            {values?.map((value) => (
              <FormItem key={value} className="mb-2 flex items-center gap-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value={value} />
                </FormControl>
                <FormLabel className="font-normal">{value}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
    </div>)
  );
}
