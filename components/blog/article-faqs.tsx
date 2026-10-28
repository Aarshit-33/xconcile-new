import { FAQ_SECTION_ID } from "@/sanity/lib/blog-post";

/**
 * Article FAQs (design pages/blog/page.svg): last part of the article column, heading in the
 * Table of Contents, each question as a bold sub-heading with its answer below (always open,
 * as drawn). Content: Blog Post → FAQs. Also emitted as FAQPage JSON-LD by the page.
 */
export function ArticleFaqs({ title, faqs }: { title: string; faqs: { question: string; answer: string }[] }) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby={FAQ_SECTION_ID} className="mt-10 flex flex-col gap-6 lg:mt-16">
      <h2 id={FAQ_SECTION_ID} className="text-h2-m font-semibold text-heading lg:text-[32px] lg:leading-10">
        {title}
      </h2>
      <dl className="flex flex-col gap-6">
        {faqs.map((f) => (
          <div key={f.question} className="flex flex-col gap-2">
            <dt className="text-h4-m text-heading lg:text-h5">{f.question}</dt>
            <dd className="text-b1 whitespace-pre-line text-body">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
