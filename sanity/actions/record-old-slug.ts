import { type DocumentActionComponent, useDocumentOperation } from "sanity";

/** Page document types whose URL slug is editable (sanity/schemaTypes/v2/page-url-fields.ts). */
export const URL_SLUG_TYPES = new Set(["servicePage", "hirePage", "industryPage"]);

type SlugDoc = { slug?: { current?: string }; oldSlugs?: string[] } | null | undefined;

/**
 * Wraps Studio's Publish action for page documents: when the draft's URL slug differs from the
 * published one, the published (old) slug is added to `oldSlugs` before publishing, so the old
 * address keeps working as a 301 (sanity/lib/page-urls.ts). Publishing an old slug again
 * removes it from the list. Everything else (label, shortcut, disabled state, validation) is
 * the built-in action's. Same patch-then-publish pattern as Sanity's documented
 * "set a field on publish" action.
 */
export function withOldSlugRecord(publish: DocumentActionComponent): DocumentActionComponent {
  const RecordOldSlugPublish: DocumentActionComponent = (props) => {
    const { patch } = useDocumentOperation(props.id, props.type);
    const original = publish(props);
    if (!original) return original;

    return {
      ...original,
      onHandle: () => {
        const draft = props.draft as SlugDoc;
        const before = (props.published as SlugDoc)?.slug?.current;
        const after = draft?.slug?.current;
        const current = draft?.oldSlugs ?? [];
        if (after) {
          const next = [...current, ...(before && before !== after ? [before] : [])].filter(
            (s, i, all) => s !== after && all.indexOf(s) === i,
          );
          if (next.length !== current.length || next.some((s, i) => s !== current[i]))
            patch.execute([{ set: { oldSlugs: next } }]);
        }
        original.onHandle?.();
      },
    };
  };
  RecordOldSlugPublish.action = publish.action;
  RecordOldSlugPublish.displayName = "RecordOldSlugPublish";
  return RecordOldSlugPublish;
}
