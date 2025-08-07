import { cn } from "@styles/utils";
import { forwardRef } from "react";
import { INPUT_ELEMENTS } from "./Input.enum";
import { InputProps } from "./Input.types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            className="text-sm font-medium text-gray-700"
            data-cy={INPUT_ELEMENTS.LABEL}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          data-cy={INPUT_ELEMENTS.INPUT}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600" data-cy={INPUT_ELEMENTS.ERROR}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-500" data-cy={INPUT_ELEMENTS.HELPER}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
