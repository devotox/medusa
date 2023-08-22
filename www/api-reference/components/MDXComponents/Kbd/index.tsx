import clsx from "clsx"

type KbdProps = React.ComponentProps<"kbd">

const Kbd = ({ children, className, ...props }: KbdProps) => {
  return (
    <kbd
      className={clsx(
        "h-[20px] w-[20px] rounded-sm px-[6px] py-0",
        "inline-flex items-center justify-center",
        "border-medusa-tag-neutral-border dark:border-medusa-tag-neutral-border-dark border",
        "bg-medusa-tag-neutral-bg dark:bg-medusa-tag-neutral-bg-dark",
        "text-medusa-tag-neutral-text dark:text-medusa-tag-neutral-text-dark",
        "text-compact-x-small-plus",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  )
}

export default Kbd
