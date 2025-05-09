# 📧 Email Template Builder – Developer Usage Guide

Welcome to the Email Template Builder! This guide will help you understand the core architecture and how to extend or work with the drag-and-drop editor.

---

## 🏗️ Project Structure

/src
  ├─ components/
  │   ├─ CanvasMode.tsx        # Main editor surface
  │   ├─ Palette.tsx           # Block selection panel
  │   ├─ BlockRenderer.tsx     # Renders block types
  │   └─ BlockPreview.tsx      # Preview during drag
  ├─ stores/
  │   └─ useTemplateStore.ts   # Zustand store for template state
  └─ app/
      └─ Builder.tsx           # Root layout w/ DndContext

---

## 🧠 State Management (Zustand)

All shared editor state is managed via useTemplateStore.

const {
  blocks,
  mode,
  selectedBlockId,
  selectBlock,
  addBlock,
  removeBlock,
  updateBlock,
} = useTemplateStore();

---

## 🧲 Drag & Drop Integration (Dnd Kit)

- The DndContext wraps Palette, CanvasMode, and DragOverlay.
- Blocks can be dragged from the Palette and dropped into CanvasMode.

<DndContext>
  <Palette />
  <CanvasMode />
  <DragOverlay>
    {activeType && <BlockPreview type={activeType} />}
  </DragOverlay>
</DndContext>

---

## 🧱 Adding New Blocks

To register a new block:

1. Add its config to Palette.tsx:

{ type: "image", label: "Image", icon: <ImageIcon /> }

2. Handle rendering in BlockRenderer.tsx:

switch (block.type) {
  case "image":
    return <img src={block.data.url} alt="" />;
}

3. (Optional) Add editor controls for it in a sidebar.

---

## 🎨 Modes

Editor modes are controlled by mode in the store:
- "canvas" — for drag/drop editing
- "preview" — for visual preview
- "html" — for raw HTML output

---

## 📦 Export HTML

Use a utility (WIP or custom) to serialize blocks to raw HTML.

const html = renderBlocksToHtml(blocks);

---

## 🧪 Testing

- Run yarn dev to start the editor
- All drag interactions are handled using @dnd-kit/core

---

Need help? Check component-level comments or reach out in the dev channel!
