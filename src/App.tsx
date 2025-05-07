"use client";
import "./App.css";
import Editor from "./components/editor/Editor";
import Palette from "./components/palette/Palette";
import ActionPane from "./components/actionPane/ActionPane";

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useTemplateStore, type BlockType } from "@/stores/useTemplateStore";

function App() {
  const { addBlock } = useTemplateStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before activation
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // If dropped over the editor
    if (over && over.id === "editor-droppable") {
      const blockType = active.data.current?.type as BlockType;
      if (blockType) {
        addBlock(blockType);
      }
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-row justify-between h-screen max-w-screen min-w-screen bg-background">
        <Palette />
        <Editor />
        <ActionPane />
      </div>
    </DndContext>
  );
}

export default App;
