import React from "react";
import { BlockRenderer } from "../../BlockRenderer";
import { useTemplateStore } from "@/stores/useTemplateStore";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";

const CanvasMode = () => {
  const { blocks, mode, addBlock, selectBlock, selectedBlockId } =
    useTemplateStore();

  const { setNodeRef, isOver } = useDroppable({
    id: "editor-droppable",
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over?.id === "editor-droppable") {
      const blockType = active?.data?.current?.type;
      if (blockType) {
        addBlock(blockType); // create a block of this type and add to store
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {mode === "canvas" && (
        <div
          ref={setNodeRef}
          className={`shadow-sm min-h-full mx-auto rounded-lg bg-white p-4 ${
            isOver ? "ring-2 ring-primary ring-opacity-50 bg-gray-50" : ""
          }`}
        >
          {blocks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p>Drag and drop building blocks here</p>
              <p className="mt-2 text-sm">or click on a block in the palette</p>
            </div>
          ) : (
            <div className="space-y-4">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className={`cursor-pointer ${
                    selectedBlockId === block.id
                      ? "ring-2 ring-primary"
                      : "hover:ring-2 hover:ring-gray-200"
                  }`}
                  onClick={() => selectBlock(block.id)}
                >
                  <BlockRenderer block={block} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </DndContext>
  );
};

export default CanvasMode;
