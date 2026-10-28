import { useCallback, useMemo, type CSSProperties } from "react";
import { set, unset, useFormValue, type ArrayOfObjectsInputProps } from "sanity";

/**
 * Spreadsheet-style editor for a blog table's `rows` (user request 2026-10-28: "allow to add
 * both rows and columns"). Editors type into a grid and use + Add row / + Add column, or the ×
 * buttons to remove a row or column; a column is added to / removed from every row at once.
 * With "First row / column is the header" on, those cells are tinted and prompt for the column
 * / row names (same request, follow-up).
 *
 * The stored shape is unchanged (`rows[] { _type: "tableRow", cells: string[] }`), so existing
 * tables, the GROQ queries and the website renderer (components/blog/article-body.tsx) are not
 * affected. Rows with fewer cells (older content) show empty cells, filled in when edited.
 *
 * Plain elements + Sanity UI CSS variables, like the icon picker (no @sanity/ui dependency).
 */

type Row = { _key: string; _type?: string; cells?: string[] };

const newKey = () => crypto.randomUUID().replace(/-/g, "").slice(0, 12);
const newRow = (columns: number): Row => ({
  _key: newKey(),
  _type: "tableRow",
  cells: Array.from({ length: columns }, () => ""),
});
/** Every row padded to `columns` cells, keeping its key. */
const padded = (rows: Row[], columns: number): Row[] =>
  rows.map((r) => ({
    ...r,
    _type: r._type ?? "tableRow",
    cells: Array.from({ length: columns }, (_, i) => r.cells?.[i] ?? ""),
  }));

export function TableGridInput(props: ArrayOfObjectsInputProps<Row>) {
  const { onChange, readOnly, path, elementProps } = props;
  const rows = useMemo(() => (props.value ?? []) as Row[], [props.value]);
  const columns = rows.reduce((n, r) => Math.max(n, r.cells?.length ?? 0), 0);
  // Sibling switches "First row / column is the header" (articleTable.hasHeaderRow, default on;
  // hasHeaderColumn, default off). Header cells are where editors name the columns / rows.
  const hasHeaderRow = useFormValue([...path.slice(0, -1), "hasHeaderRow"]) !== false;
  const hasHeaderColumn = useFormValue([...path.slice(0, -1), "hasHeaderColumn"]) === true;

  const replace = useCallback(
    (next: Row[]) => onChange(next.length ? set(next) : unset()),
    [onChange],
  );

  const setCell = (ri: number, ci: number, text: string) => {
    const row = rows[ri];
    if ((row.cells?.length ?? 0) > ci) {
      onChange(set(text, [{ _key: row._key }, "cells", ci]));
    } else {
      // Short (older) row: write it out at full width.
      const cells = Array.from({ length: columns }, (_, i) => row.cells?.[i] ?? "");
      cells[ci] = text;
      onChange(set(cells, [{ _key: row._key }, "cells"]));
    }
  };

  const addRow = () =>
    replace([...padded(rows, Math.max(columns, 1)), newRow(Math.max(columns, 1))]);
  const addColumn = () => replace(rows.length ? padded(rows, columns + 1) : [newRow(1)]);
  const removeRow = (ri: number) => replace(rows.filter((_, i) => i !== ri));
  const removeColumn = (ci: number) =>
    replace(
      columns <= 1
        ? []
        : padded(rows, columns).map((r) => ({ ...r, cells: r.cells!.filter((_, i) => i !== ci) })),
    );
  const moveRow = (ri: number, by: -1 | 1) => {
    const to = ri + by;
    if (to < 0 || to >= rows.length) return;
    const next = [...rows];
    [next[ri], next[to]] = [next[to], next[ri]];
    replace(next);
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <span style={muted}>
        {hasHeaderRow || hasHeaderColumn
          ? `Headings: type them into the tinted ${
              hasHeaderRow && hasHeaderColumn
                ? "first row (columns) and first column (rows)"
                : hasHeaderRow
                  ? "first row"
                  : "first column"
            }.`
          : "No headings. Switch on “First row is the header” or “First column is the header” above to name the columns or rows."}
      </span>
      {rows.length ? (
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", minWidth: "100%" }}>
            <thead>
              <tr>
                <th style={corner} />
                {Array.from({ length: columns }, (_, ci) => (
                  <th key={ci} style={colHead}>
                    {/* Controls only: the column's heading is typed into the tinted header row
                        below (a label here read like an uneditable title, user 2026-10-28). */}
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {!readOnly ? (
                        <button
                          type="button"
                          onClick={() => removeColumn(ci)}
                          title={`Remove column ${ci + 1}`}
                          aria-label={`Remove column ${ci + 1}`}
                          style={{ ...iconButton, marginLeft: "auto" }}
                        >
                          ×
                        </button>
                      ) : null}
                    </span>
                  </th>
                ))}
                <th style={corner} />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => {
                const headerRow = hasHeaderRow && ri === 0;
                return (
                  <tr key={row._key}>
                    <th scope="row" style={{ ...rowHead, ...muted }}>
                      {headerRow ? "Headings" : ri + 1}
                    </th>
                    {Array.from({ length: columns }, (_, ci) => {
                      const headerCol = hasHeaderColumn && ci === 0;
                      const header = headerRow || headerCol;
                      return (
                        <td key={ci} style={header ? { ...cell, ...headerCell } : cell}>
                          <input
                            // First cell takes the field's id/ref so validation messages focus it.
                            {...(ri === 0 && ci === 0
                              ? { id: elementProps.id, ref: elementProps.ref as never }
                              : {})}
                            value={row.cells?.[ci] ?? ""}
                            readOnly={readOnly}
                            onChange={(e) => setCell(ri, ci, e.currentTarget.value)}
                            placeholder={
                              headerRow && headerCol
                                ? "Corner (optional)"
                                : headerRow
                                  ? `Type column ${ci + 1} heading`
                                  : headerCol
                                    ? `Type row heading`
                                    : undefined
                            }
                            aria-label={`Row ${ri + 1}, column ${ci + 1}`}
                            style={{
                              ...input,
                              ...(header ? { background: "transparent", fontWeight: 600 } : {}),
                            }}
                          />
                        </td>
                      );
                    })}
                    <td style={{ ...cell, whiteSpace: "nowrap" }}>
                      {!readOnly ? (
                        <span style={{ display: "flex", gap: 2 }}>
                          <button
                            type="button"
                            onClick={() => moveRow(ri, -1)}
                            disabled={ri === 0}
                            title="Move row up"
                            aria-label={`Move row ${ri + 1} up`}
                            style={iconButton}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveRow(ri, 1)}
                            disabled={ri === rows.length - 1}
                            title="Move row down"
                            aria-label={`Move row ${ri + 1} down`}
                            style={iconButton}
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() => removeRow(ri)}
                            title="Remove row"
                            aria-label={`Remove row ${ri + 1}`}
                            style={iconButton}
                          >
                            ×
                          </button>
                        </span>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <span style={muted}>Empty table. Add a column and a row to start.</span>
      )}

      {!readOnly ? (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <button type="button" onClick={addRow} style={button}>
            + Add row
          </button>
          <button type="button" onClick={addColumn} style={button}>
            + Add column
          </button>
          <span style={{ ...muted, marginLeft: "auto" }}>
            {rows.length} {rows.length === 1 ? "row" : "rows"} × {columns}{" "}
            {columns === 1 ? "column" : "columns"}
          </span>
        </div>
      ) : null}
    </div>
  );
}

const border = "1px solid var(--card-border-color, #e3e4e8)";
const muted: CSSProperties = { color: "var(--card-muted-fg-color, #6e7683)", fontSize: 12 };
const button: CSSProperties = {
  padding: "6px 10px",
  borderRadius: 4,
  border,
  background: "transparent",
  color: "var(--card-fg-color, inherit)",
  font: "inherit",
  fontSize: 13,
  cursor: "pointer",
};
const iconButton: CSSProperties = { ...button, padding: "2px 7px", lineHeight: 1.2 };
const cell: CSSProperties = { border, padding: 0, verticalAlign: "middle" };
const colHead: CSSProperties = { ...cell, padding: "4px 6px", fontWeight: 400, minWidth: 140 };
const rowHead: CSSProperties = { ...cell, padding: "0 8px", textAlign: "center", fontWeight: 400 };
const corner: CSSProperties = { padding: 0 };
/** Header cells (column / row names): tinted so they read as labels, not data. */
const headerCell: CSSProperties = { background: "var(--card-muted-bg-color, #f3f4f6)" };
const input: CSSProperties = {
  width: "100%",
  minWidth: 140,
  boxSizing: "border-box",
  padding: "8px 10px",
  border: 0,
  background: "var(--card-bg-color, #fff)",
  color: "var(--card-fg-color, inherit)",
  font: "inherit",
  fontSize: 14,
};
