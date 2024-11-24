import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";

function AutoFormLabel({
  label,
  isRequired,
  className
}) {
  return (<>
    <FormLabel className={cn(className)}>
      {label}
      {isRequired && <span className="text-destructive"> *</span>}
    </FormLabel>
  </>);
}

export default AutoFormLabel;
