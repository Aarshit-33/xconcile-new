import { useFormValue, type FieldProps, type Path } from "sanity";

type Context = {
  /** `_type` of the document being edited (e.g. "home", "servicePage"). */
  docType?: string;
  /** Path of this field inside the document (e.g. ["founder", "person", "image"]). */
  path: Path;
};

/**
 * Field component for a field whose help text depends on where it is used (user request
 * 2026-10-29: "on each page, show only its relevant info"). Shared section types (Intro, Person,
 * Stat) appear on several pages with different image sizes; `pick` returns the text for the
 * current document type / location, and the field's own `description` stays as the fallback.
 *
 *   components: { field: contextualDescription(({ docType }) => docType === "home" ? A : B) }
 */
export function contextualDescription(pick: (context: Context) => string | undefined) {
  return function ContextualDescriptionField(props: FieldProps) {
    const docType = useFormValue(["_type"]) as string | undefined;
    const description = pick({ docType, path: props.path }) ?? props.description;
    return props.renderDefault({ ...props, description });
  };
}
