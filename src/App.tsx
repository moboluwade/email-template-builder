"use client";
import "./App.css";
import Editor from "./components/editor/Editor";
import Palette from "./components/palette/Palette";
import ActionPane from "./components/actionPane/ActionPane";
import { buildingBlocks } from "./lib/buildingBlocks";

import {
  closestCenter,
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
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function App() {
  const { addBlock, blocks, moveBlock } = useTemplateStore();
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

    // If dropped over the editor for a new block
    if (over && over.id === "editor-droppable" && active.data.current?.type) {
      const blockType = active.data.current?.type as BlockType;
      if (blockType) {
        addBlock(blockType);
      }
      setActiveId(null);
      return;
    }

    //Handle reordering of existing blocks on the canvas.
    if (over && active.id != over.id) {
      const activeIndex = blocks.findIndex((block) => block.id === active.id);
      const overIndex = blocks.findIndex((block) => block.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        moveBlock(blocks[activeIndex].id, overIndex);
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
      collisionDetection={closestCenter}
    >
      <div className="flex flex-row justify-between h-screen max-w-screen min-w-screen bg-background">
        <Palette buildingBlocks={buildingBlocks} />
        <SortableContext
          items={blocks.map((block) => block.id)}
          strategy={verticalListSortingStrategy}
        >
          <Editor />
        </SortableContext>
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
