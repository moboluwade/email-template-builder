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
import { useCallback, useRef, useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function App() {
  const { addBlock, blocks, moveBlock } = useTemplateStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [currentDroppableId, setCurrentDroppableId] = useState<string | null>(
    null
  );
  const recentlyMovedToNewContainer = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before activation
      },
    })
  );

  const findContainer = useCallback(
    (id: string) => {
      if (id === "editor-droppable") return "editor-droppable";

      // Check if id is a block id
      const blockIndex = blocks.findIndex((block) => block.id === id);
      if (blockIndex !== -1) return "editor-droppable";

      // Otherwise, it's a palette item
      return "palette";
    },
    [blocks]
  );

  const handleDragOver = (event: any) => {
    const { active, over } = event;

    // No over element (not hovering over anything droppable)
    if (!over) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    if (
      activeContainer !== overContainer &&
      overContainer === "editor-droppable" &&
      !recentlyMovedToNewContainer.current
    ) {
      // We're moving from palette to editor
      setCurrentDroppableId(overContainer);
      recentlyMovedToNewContainer.current = true;
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);

    const { active } = event;
    setActiveId(active.id as string);

    setCurrentDroppableId(findContainer(active.id as string));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // after operation, reset the recentlyMovedToNewContainer state
    recentlyMovedToNewContainer.current = false;

    // if nothing to frop on, do nothing
    if (!over) {
      setActiveId(null);
      setCurrentDroppableId(null);
      return;
    }

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    // If palette item is dropping inot the editor
    if (activeContainer === "palette" && overContainer === "editor-droppable") {
      const blockType = active.data.current?.type as BlockType;

      if (blockType) {
        // If dropping on an existing block, insert at that position
        if (over.id !== "editor-droppable") {
          const overIndex = blocks.findIndex((block) => block.id === over.id);
          // but check position first
          if (overIndex !== -1) {
            // if real position, add block to position.
            addBlock(blockType, overIndex);
          } else {
            // if abstract position, add block to end
            addBlock(blockType);
          }
        } else {
          // if hovering over editor, add block to the end.
          addBlock(blockType);
        }
      }
    }
    // for reordering existing blocks within the editor.
    if (
      activeContainer === "editor-droppable" &&
      overContainer === "editor-droppable"
    ) {
      if (active.id !== over.id) {
        const activeIndex = blocks.findIndex((block) => block.id === active.id);
        const overIndex = blocks.findIndex((block) => block.id === over.id);
        if (activeIndex !== -1 && overIndex !== -1) {
          moveBlock(blocks[activeIndex].id, overIndex);
        }
      }
    }
    setActiveId(null);
    setCurrentDroppableId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setCurrentDroppableId(null);
    recentlyMovedToNewContainer.current = false;
  };

  const activeBlock = activeId
    ? buildingBlocks.find((block) => block.type === activeId)
    : null;

  const isPaletteItemActive = activeBlock !== null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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
          <Editor isPaletteItemActive={isPaletteItemActive} />
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
