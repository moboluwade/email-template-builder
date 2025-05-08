import React from "react";
import { BlockRenderer } from "../../BlockRenderer";
import { useTemplateStore } from "@/stores/useTemplateStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

// for sortable block component
function SortableBlock({ block, index }: { block: any; index: number }) {
  const { selectBlock, selectedBlockId } = useTemplateStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    data: {
      index,
      block,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative" as const,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-4 group ${
        selectedBlockId === block.id
          ? "ring-2 ring-[#0f0f14] rounded-xs"
          : "hover:ring-2 hover:ring-gray-200"
      }`}
      onClick={() => selectBlock(block.id)}
    >
      <div className="relative">
        <div
          className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-8 transition-opacity opacity-0 group-hover:opacity-100 cursor-grab"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} className="text-gray-400" />
        </div>
        <div className="pl-8">
          <BlockRenderer block={block} />
        </div>
      </div>
    </div>
  );
}

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
            <div>
              {blocks.map((block, index) => (
                <SortableBlock key={block.id} block={block} index={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </DndContext>
  );
};

export default CanvasMode;
