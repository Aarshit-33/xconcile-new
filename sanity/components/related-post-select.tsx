import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";
import { set, unset, useClient, useFormValue, type StringInputProps } from "sanity";

type Option = { slug: string; title: string };

const POSTS = `*[_type == "blogPost" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc){ "slug": slug.current, title }`;

/**
 * Related blog picker (Blog Post → Related blogs): a dropdown of every published blog post in
 * this dataset. Stores the post's slug; the article page resolves it. The current post is left
 * out of the list.
 */
export function RelatedPostSelect(props: StringInputProps) {
  const { value, onChange, readOnly, elementProps } = props;
  const client = useClient({ apiVersion: "2025-02-19" });
  const currentSlug = useFormValue(["slug", "current"]) as string | undefined;
  const [options, setOptions] = useState<Option[] | null>(null);
  const [failed, setFailed] = useState(false);
  const fallbackId = useId();

  useEffect(() => {
    let cancelled = false;
    client
      .fetch<Option[]>(POSTS)
      .then((list) => {
        if (cancelled) return;
        setOptions(list);
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [client]);

  const choices = useMemo(() => (options ?? []).filter((o) => o.slug !== currentSlug), [options, currentSlug]);
  const selected = options?.find((o) => o.slug === value);

  if (failed) return <p style={muted}>Couldn’t load the blog posts. Reload the Studio and try again.</p>;

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <select
        {...elementProps}
        id={elementProps.id ?? fallbackId}
        value={value ?? ""}
        disabled={readOnly || !options}
        onChange={(e) => onChange(e.currentTarget.value ? set(e.currentTarget.value) : unset())}
        style={select}
      >
        <option value="">{options ? "Choose a blog post…" : "Loading blog posts…"}</option>
        {/* Keep a saved value visible even if that post was since unpublished. */}
        {value && options && !selected ? <option value={value}>{value} (not found)</option> : null}
        {choices.map((o) => (
          <option key={o.slug} value={o.slug}>
            {o.title}
          </option>
        ))}
      </select>
      {value ? <span style={muted}>/blog/{value}</span> : null}
    </div>
  );
}

const muted: CSSProperties = { color: "var(--card-muted-fg-color, #6e7683)", fontSize: 13 };
const select: CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 4,
  border: "1px solid var(--card-border-color, #e3e4e8)",
  background: "var(--card-bg-color, #fff)",
  color: "var(--card-fg-color, inherit)",
  font: "inherit",
  fontSize: 14,
};
