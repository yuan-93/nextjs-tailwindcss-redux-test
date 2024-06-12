interface ExternalLinkProps {
  href: string;
  children?: React.ReactNode;
  newTab?: boolean;
}

export function ExternalLink(props: ExternalLinkProps) {
  const { href, children, newTab } = props;

  return (
    <a
      className=" underline-offset-2 underline"
      href={href}
      rel="noopener noreferrer"
      {...(newTab && { target: "_blank" })}
    >
      {children}
    </a>
  );
}
