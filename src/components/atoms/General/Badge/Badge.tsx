import { cn } from "@styles/utils";
import { BADGE_ELEMENTS } from "./Badge.enum";
import { BadgeProps } from "./Badge.types";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  className,
  ...props
}: BadgeProps) => {
  const baseClasses =
    "inline-flex items-center rounded-full border font-medium";

  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    danger: "bg-red-100 text-red-800 border-red-200",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <div
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      data-cy={BADGE_ELEMENTS.BADGE}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;
