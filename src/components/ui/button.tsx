
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { SoundEffects } from "@/utils/soundEffects"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:shadow-lg hover:shadow-primary/25 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/30",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-destructive/30",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/50 hover:shadow-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-secondary/30",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-accent/20",
        link: "text-primary underline-offset-4 hover:underline hover:shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  soundEffect?: 'click' | 'success' | 'hover' | 'notification' | 'none'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, soundEffect = 'click', onClick, onMouseEnter, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (soundEffect !== 'none') {
        switch (soundEffect) {
          case 'click':
            SoundEffects.playClickSound();
            break;
          case 'success':
            SoundEffects.playSuccessSound();
            break;
          case 'notification':
            SoundEffects.playNotificationSound();
            break;
        }
      }
      
      if (onClick) {
        onClick(e);
      }
    };
    
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (soundEffect === 'hover') {
        SoundEffects.playHoverSound();
      }
      
      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
