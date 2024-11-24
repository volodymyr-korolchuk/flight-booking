import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define input variants
const inputVariants = cva(
  "", // Base styles
  {
    variants: {
      variant: {
        default: "",
        text: "border border-solid border-chineseWhite font-medium text-raisinBlack",
      },
      size: {
        md: "rounded-md px-2 py-4 text-sm leading-4 "
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Define InputProps interface
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "size">, // Exclude conflicting properties
    VariantProps<typeof inputVariants> {
  className?: string; // Redefine `className` explicitly
}

// Input component
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
