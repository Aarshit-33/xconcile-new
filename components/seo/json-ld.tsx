/**
 * Renders a JSON-LD <script>. Non-visual SEO utility (not a UI component).
 * Escapes `<` so content from Sanity can't break out of the script tag.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
