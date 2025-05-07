import { create } from "zustand";
import { nanoid } from "nanoid";

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
}

interface TemplateState {
  blocks: Block[];
  selectedBlockId: string | null;
  mode: "editor" | "preview" | "html";

  // Actions
  addBlock: (type: BlockType, position?: number) => void;
  updateBlock: (id: string, content: Record<string, any>) => void;
  removeBlock: (id: string) => void;
  moveBlock: (id: string, newPosition: number) => void;
  selectBlock: (id: string | null) => void;
  setMode: (mode: "editor" | "preview" | "html") => void;
  getHtmlOutput: () => string;
}

// Default content for each block type
const getDefaultContent = (type: BlockType): Record<string, any> => {
  switch (type) {
    case "header":
      return {
        text: "Your Header",
        level: "h1",
        align: "left",
        color: "#000000",
      };
    case "paragraph":
      return {
        text: "Your paragraph text goes here.",
        align: "left",
        color: "#000000",
      };
    case "button":
      return {
        text: "Click Me",
        url: "#",
        backgroundColor: "#645FCF",
        textColor: "#FFFFFF",
        align: "center",
      };
    case "image":
      return {
        src: "",
        alt: "Image description",
        width: "100%",
        align: "center",
      };
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
      return { color: "#CCCCCC", style: "solid", thickness: 1 };
    case "spacer":
      return { height: 20 };
    default:
      return {};
  }
};

export const useTemplateStore = create<TemplateState>((set, get) => ({
  blocks: [],
  selectedBlockId: null,
  mode: "editor",

  addBlock: (type, position) =>
    set((state) => {
      const newBlock: Block = {
        id: nanoid(),
        type,
        content: getDefaultContent(type),
        position: position !== undefined ? position : state.blocks.length,
      };

      const newBlocks = [...state.blocks];
      newBlocks.splice(newBlock.position, 0, newBlock);

      // Update positions for all blocks
      const updatedBlocks = newBlocks.map((block, index) => ({
        ...block,
        position: index,
      }));

      return {
        blocks: updatedBlocks,
        selectedBlockId: newBlock.id,
      };
    }),

  updateBlock: (id, content) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id
          ? { ...block, content: { ...block.content, ...content } }
          : block
      ),
    })),

  removeBlock: (id) =>
    set((state) => {
      const newBlocks = state.blocks.filter((block) => block.id !== id);

      // Update positions for all blocks
      const updatedBlocks = newBlocks.map((block, index) => ({
        ...block,
        position: index,
      }));

      return {
        blocks: updatedBlocks,
        selectedBlockId: null,
      };
    }),

  moveBlock: (id, newPosition) =>
    set((state) => {
      const blockIndex = state.blocks.findIndex((block) => block.id === id);
      if (blockIndex === -1) return state;

      const newBlocks = [...state.blocks];
      const [movedBlock] = newBlocks.splice(blockIndex, 1);
      newBlocks.splice(newPosition, 0, movedBlock);

      // Update positions for all blocks
      const updatedBlocks = newBlocks.map((block, index) => ({
        ...block,
        position: index,
      }));

      return { blocks: updatedBlocks };
    }),

  selectBlock: (id) => set({ selectedBlockId: id }),

  setMode: (mode) => set({ mode }),

  getHtmlOutput: () => {
    const { blocks } = get();

    // This is a simplified version - you'll want to expand this
    // to generate proper HTML for email templates
    const htmlParts = blocks.map((block) => {
      switch (block.type) {
        case "header":
          return `<${block.content.level} style="color: ${block.content.color}; text-align: ${block.content.align};">${block.content.text}</${block.content.level}>`;
        case "paragraph":
          return `<p style="color: ${block.content.color}; text-align: ${block.content.align};">${block.content.text}</p>`;
        case "button":
          return `<div style="text-align: ${block.content.align};"><a href="${block.content.url}" style="display: inline-block; padding: 10px 20px; background-color: ${block.content.backgroundColor}; color: ${block.content.textColor}; text-decoration: none; border-radius: 4px;">${block.content.text}</a></div>`;
        case "image":
          return `<div style="text-align: ${block.content.align};"><img src="${block.content.src}" alt="${block.content.alt}" style="width: ${block.content.width};" /></div>`;
        case "divider":
          return `<hr style="border: 0; border-top: ${block.content.thickness}px ${block.content.style} ${block.content.color};" />`;
        case "spacer":
          return `<div style="height: ${block.content.height}px;"></div>`;
        // Add other block types as needed
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
