import { createCn } from "cn/config";

/**
 * Class merging aware of the design tokens in app/globals.css.
 * Without this, custom font sizes like `text-h2` are mistaken for text colours and get
 * dropped when combined with e.g. `text-brand`. Keep in sync with the @theme tokens.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "h1",
            "h1-m",
            "h2",
            "h2-m",
            "h3",
            "h4-m",
            "h5",
            "stat",
            "stat-sm",
            "b1",
            "b2",
            "b3",
            "b3-tight",
            "eyebrow",
          ],
        },
      ],
      rounded: [{ rounded: ["pill"] }],
    },
  },
});
