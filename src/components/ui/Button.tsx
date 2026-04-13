type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?:
    | "primaryDesktop"
    | "secondaryDesktop"
    | "primaryMobile"
    | "secondaryMobile";
};

export function Button({
  children,
  variant = "primaryDesktop",
  className = "",
  ...props
}: ButtonProps) {
  const base = "px-4 py-2 rounded transition";

  const styles = {
    primaryDesktop:
      "flex justify-center items-center w-60 h-18 font-medium text-white bg-(--primary-color) rounded-2xl cursor-pointer hover:bg-(--primary-color-hover)",
    secondaryDesktop:
      "flex justify-center items-center w-60 h-18 font-medium bg-white rounded-2xl cursor-pointer hover:bg-(--secondary-color-hover)",
    primaryMobile:
      "flex justify-center items-center w-40 h-13 font-medium text-white text-[1rem] bg-(--primary-color) rounded-xl cursor-pointer hover:bg-(--primary-color-hover)",
    secondaryMobile:
      "flex justify-center items-center w-40 h-13 font-medium text-[1rem] bg-white rounded-xl cursor-pointer hover:bg-(--secondary-color-hover)",
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
