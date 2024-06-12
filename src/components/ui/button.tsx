interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline";
}

export function Button(props: ButtonProps) {
  const { children, variant = "default", ...rest } = props;

  const className =
    variant === "default"
      ? "bg-black text-white"
      : "bg-white text-black border border-black";

  return (
    <button
      className={`${className} w-fit px-4 py-2 rounded-lg min-w-28 text-center hover:opacity-70`}
      {...rest}
    >
      {children}
    </button>
  );
}
