import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-bold tracking-wider uppercase ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform-gpu",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary text-primary hover:bg-primary/10",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-8 py-3",
        sm: "h-10 px-6",
        lg: "h-14 px-12 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  const MotionComp = motion(Comp); // Correctly wrap the component with motion

  // Define Framer Motion properties based on variant for a subtle color effect
  const motionProps = {
    whileHover: {
      scale: 1.02,
      boxShadow: "0px 8px 16px rgba(var(--primary-rgb), 0.4)",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  return (
    (<MotionComp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...(variant === "primary" ? motionProps : {})} // Apply motion only to primary buttons
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }