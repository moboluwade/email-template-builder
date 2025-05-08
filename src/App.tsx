"use client";
import "./App.css";
import Editor from "./components/editor/Editor";
import Palette from "./components/palette/Palette";
import ActionPane from "./components/actionPane/ActionPane";
import { buildingBlocks } from "./lib/buildingBlocks";

import {
  DndContext,
  DragCancelEvent,
  type DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useTemplateStore, type BlockType } from "@/stores/useTemplateStore";
import { useState } from "react";

function App() {
  const { addBlock } = useTemplateStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before activation
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
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

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeBlock = activeId
    ? buildingBlocks.find((block) => block.type === activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-row justify-between h-screen max-w-screen min-w-screen bg-background">
        <Palette buildingBlocks={buildingBlocks} />
        <Editor />
        <ActionPane />
      </div>

      <DragOverlay>
        {activeId && activeBlock ? (
          <div className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-md cursor-grabbing">
            <div className="mb-2 text-gray-700">{activeBlock.icon}</div>
            <span className="text-xs text-gray-600">{activeBlock.label}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
