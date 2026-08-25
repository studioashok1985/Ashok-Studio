import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  type?: "button" | "submit";
};

export function Button({ href, onClick, children, variant = "solid", className, type = "button" }: Props) {
  const classes = clsx(
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ease-silk",
    variant === "solid" && "bg-gold text-ink hover:bg-gold-soft",
    variant === "outline" && "border border-ivory/30 text-ivory hover:border-gold hover:text-gold",
    className
  );

  const content = (
    <>
      {children}
      <ArrowUpRight size={16} className="transition-transform duration-300 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
