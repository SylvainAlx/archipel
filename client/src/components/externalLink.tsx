import { ExternalLinkProps } from "../types/typProp";

export default function ExternalLink({ url, children }: ExternalLinkProps) {
  return (
    <div className="text-3xl">
      {url != "" ? (
        <a href={url} target="_blank" className="cursor-pointer text-secondary">
          {children}
        </a>
      ) : (
        <div className="opacity-20">{children}</div>
      )}
    </div>
  );
}
