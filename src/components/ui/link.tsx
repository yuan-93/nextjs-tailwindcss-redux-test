import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
  children?: React.ReactNode;
}

export function Link(props: LinkProps) {
  const { children, href } = props;
  return (
    <NextLink
      href={href}
      className=" bg-black text-white w-fit px-4 py-2 rounded-lg min-w-28 text-center h-fit hover:opacity-70"
    >
      {children}
    </NextLink>
  );
}
