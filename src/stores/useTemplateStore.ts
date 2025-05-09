import { create } from "zustand";
import { nanoid } from "nanoid";
import { serializeStyles } from "@/lib/serializeStyles";

export type BlockType =
  | "header"
  | "paragraph"
  | "button"
  | "image"
  | "table"
  | "list"
  | "divider"
  | "spacer";

export interface Block {
  id: string;
  type: BlockType;
  content: Record<string, any>;
  position: number;
  styles: Record<string, any>;
}

interface TemplateState {
  blocks: Block[];
  selectedBlockId: string | null;
  mode: "canvas" | "preview" | "html";

  addBlock: (type: BlockType, position?: number) => void;
  updateBlock: (
    id: string,
    content: Record<string, any>,
    styles: Record<string, any>
  ) => void;
  removeBlock: (id: string) => void;

  // helper func for action pane:
  handleChange: (key: string, value: any) => void;
  handleStyleChange: (key: string, value: any) => void;
  handleDelete: () => void;

  moveBlock: (id: string, newPosition: number) => void;
  selectBlock: (id: string | null) => void;
  setMode: (mode: "canvas" | "preview" | "html") => void;
  getHtmlOutput: () => string;
}

// Content-only data (non-styling)
const getDefaultContent = (type: BlockType): Record<string, any> => {
  switch (type) {
    case "header":
      return { text: "Your Header", level: "h1" };
    case "paragraph":
      return { text: "Your paragraph text goes here." };
    case "button":
      return { text: "Click Me", url: "#" };
    case "image":
      return { src: "", alt: "Image description" };
    case "table":
      return {
        rows: 2,
        cols: 2,
        data: [
          ["Cell 1", "Cell 2"],
          ["Cell 3", "Cell 4"],
        ],
      };
    case "list":
      return { items: ["Item 1", "Item 2", "Item 3"], type: "unordered" };
    case "divider":
      return {};
    case "spacer":
      return {};
    default:
      return {};
  }
};

// Style-only data (moved from content)
const getDefaultStyles = (type: BlockType): Record<string, any> => {
  switch (type) {
    case "header":
      return { textAlign: "left", color: "#000000", padding: "0.25rem 2rem" };
    case "paragraph":
      return { textAlign: "left", color: "#000000", padding: "0.25rem 2rem" };
    case "button":
      return {
        textAlign: "center",
        backgroundColor: "#645FCF",
        color: "#FFFFFF",
        padding: "10px 20px",
        textDecoration: "none",
        borderRadius: "4px",
        display: "inline-block",
      };
    case "image":
      return { textAlign: "center", width: "100%", padding: "0.25rem 2rem" };
    case "divider":
      return { borderTop: "1px solid #CCCCCC", padding: "0.25rem 2rem" };
    case "spacer":
      return { height: "20px", padding: "0.25rem 2rem" };

    default:
      // Add a default style
      return { textAlign: "left", color: "#000000", padding: "0.25rem 2rem" };
  }
};

export const useTemplateStore = create<TemplateState>((set, get) => ({
  blocks: [],
  selectedBlockId: null,
  mode: "canvas",

  // Adds a new block with content and styles
  addBlock: (type, position) =>
    set((state) => {
      const newBlock: Block = {
        id: nanoid(),
        type,
        content: getDefaultContent(type),
        styles: getDefaultStyles(type),
        position: position !== undefined ? position : state.blocks.length,
      };

      const newBlocks = [...state.blocks];
      newBlocks.splice(newBlock.position, 0, newBlock);

      const updatedBlocks = newBlocks.map((block, index) => ({
        ...block,
        position: index,
      }));

      return {
        blocks: updatedBlocks,
        selectedBlockId: newBlock.id,
      };
    }),

  // Updates content or styles of a block
  updateBlock: (
    id,
    content: Record<string, any>,
    styles?: Record<string, any>
  ) => {
    set((state) => {
      const updatedBlocks = state.blocks.map((block) =>
        block.id === id
          ? {
              ...block,
              content: { ...block.content, ...content },
              styles: { ...block.styles, ...styles },
            }
          : block
      );

      return { blocks: updatedBlocks };
    });
  },

  // Removes a block
  removeBlock: (id) =>
    set((state) => {
      const newBlocks = state.blocks.filter((block) => block.id !== id);
      const updatedBlocks = newBlocks.map((block, index) => ({
        ...block,
        position: index,
      }));

      return {
        blocks: updatedBlocks,
        selectedBlockId: null,
      };
    }),

    
  // Convenience helpers (handleChange, handleStyleChange, handleDelete)
  handleChange: (key: string, value:any) => {
    const { selectedBlockId, updateBlock } = get();
    if (selectedBlockId)
      updateBlock(selectedBlockId, { [key]: value }, {});
  },

  handleStyleChange: (key: string, value: any) => {
    const { selectedBlockId, updateBlock } = get();
    if (selectedBlockId)
      updateBlock(selectedBlockId, {}, { [key]: value });
  },

  handleDelete: () => {
    const { selectedBlockId, removeBlock } = get();
    if (selectedBlockId)
      removeBlock(selectedBlockId);
  },

  // Moves block to a new position
  moveBlock: (id, newPosition) =>
    set((state) => {
      const blockIndex = state.blocks.findIndex((block) => block.id === id);
      if (blockIndex === -1) return state;

      const newBlocks = [...state.blocks];
      const [movedBlock] = newBlocks.splice(blockIndex, 1);
      newBlocks.splice(newPosition, 0, movedBlock);

      const updatedBlocks = newBlocks.map((block, index) => ({
        ...block,
        position: index,
      }));

      return {
        blocks: updatedBlocks,
        selectedBlockId: id,
      };
    }),

  selectBlock: (id) => set({ selectedBlockId: id }),

  setMode: (mode) => set({ mode }),

  // Converts blocks into full HTML output
  getHtmlOutput: () => {
    const { blocks } = get();

    const htmlParts = blocks.map((block) => {
      const style = serializeStyles(block.styles);
      switch (block.type) {
        case "header":
          return `<h${
            block.content.level
          } style="margin: 0 0 16px 0; font-size: ${
            block.styles.fontSize || "20px"
          }; font-weight: bold; line-height: 1.4; ${style}">
      ${block.content.text}
    </h${block.content.level}>`;

        case "paragraph":
          return `<p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5; ${style}">
      ${block.content.text}
    </p>`;

        case "button":
          return `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 16px 0; padding: 0.25rem 2rem">
      <tr>
        <td bgcolor="${
          block.styles.backgroundColor
        }" style="border-radius: 4px;">
          <a href="${
            block.content.url
          }" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: ${
            block.styles.color
          }; text-decoration: none; font-weight: bold; ${style}">
            ${block.content.text}
          </a>
        </td>
      </tr>
    </table>`;

        case "image":
          console.log(block);
          return `
    <div style="
    text-align: ${block.styles.textAlign || "center"}; // <-- Alignment control
    margin: 16px 0;
    padding: 0.25rem 2rem; // <-- Added padding!
    width: 100%; // <-- Takes full width
  ">
    <img
      src="${block.content.src}"
      alt="${block.content.alt || ""}"
      style="
        display: inline-block; // <-- Ensures it responds to text-align
        width: ${block.styles.width || "auto"}; // <-- Image width
        max-width: 100%; // <-- Prevents overflow
        height: auto;
      "
    />
    </div>`;

        case "divider":
          return `
    <table role="presentation" width="100%" style="margin: 16px 0;">
      <tr>
        <td style="border-bottom: 1px solid #ccc; height: 1px; line-height: 1px;">&nbsp;</td>
      </tr>
    </table>`;

        case "spacer":
          return `<div style="height: ${
            block.styles.height || "24px"
          }; line-height: 1px; font-size: 1px;">&nbsp;</div>`;

        case "table": {
          const rows = block.content.data
            .map(
              (row: string[]) =>
                `<tr>${row
                  .map(
                    (cell: string) =>
                      `<td style="padding: 8px; border: 1px solid #ccc; text-align: left; word-break: break-word;">${cell}</td>`
                  )
                  .join("")}</tr>`
            )
            .join("");

          const columnCount = block.content.data[0]?.length || 1;
          const colGroup = Array.from({ length: columnCount })
            .map(() => `<col style="width: ${100 / columnCount}%;" />`)
            .join("");

          // div wrapper to add padding to the table, (table element disables padding)
          return ` <div style="padding: 4px 32px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; width: 100%; ${style}">
      <colgroup>${colGroup}</colgroup>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>`;
        }

        default:
          return "";
      }
    });

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
    <tr>
      <td>
        ${htmlParts.join("\n        ")}
      </td>
    </tr>
  </table>
</body>
</html>`;
  },
}));
