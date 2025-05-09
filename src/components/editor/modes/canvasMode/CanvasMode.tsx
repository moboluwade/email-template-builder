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
import { BuildingBlock } from "@/lib/buildingBlocks";

// for sortable block component
function SortableBlock({
  block,
  index,
  isPaletteItemActive,
}: {
  block: any;
  index: number;
  isPaletteItemActive: boolean;
}) {
  const { selectBlock, selectedBlockId } = useTemplateStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    over,
  } = useSortable({
    id: block.id,
    data: {
      index,
      block,
    },
  });

  const isOver = over?.id === block.id;
  const showTopIndicator = isOver && isPaletteItemActive;

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
      className={` group relative ${
        selectedBlockId === block.id
          ? "ring-2 ring-[#0f0f14] rounded-xs"
          : "hover:ring-2 hover:ring-gray-200 rounded-xs"
      }`}
      onClick={() => selectBlock(block.id)}
    >
      {showTopIndicator && (
        <div className="absolute top-0 left-0 right-0 h-1 -translate-y-1 rounded-full bg-[#0f0f14]" />
      )}
      <div className="relative">
        <div
          className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-8 transition-opacity opacity-0 group-hover:opacity-100 cursor-grab"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} className="text-gray-400" />
        </div>
        <BlockRenderer block={block} />
      </div>
    </div>
  );
}

interface CanvasModeProps {
  isPaletteItemActive: boolean;
}
const CanvasMode = ({ isPaletteItemActive }: CanvasModeProps) => {
  const { blocks, mode } = useTemplateStore();

  const { setNodeRef, isOver } = useDroppable({
    id: "editor-droppable",
  });

  return (
    <>
      {mode === "canvas" && (
        <div
          ref={setNodeRef}
          className={`shadow-sm min-h-full mx-auto rounded-lg bg-white p-4 ${
            isOver && isPaletteItemActive
              ? "ring-2 ring-[#0f0f14] ring-opacity-50 bg-gray-50"
              : ""
          }`}
        >
          {blocks.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-full text-gray-400">
              <p>Drag and drop building blocks here</p>
              <p className="mt-2 text-sm">or click on a block in the palette</p>
            </div>
          ) : (
            <div>
              {blocks.map((block, index) => (
                <SortableBlock
                  key={block.id}
                  block={block}
                  index={index}
                  isPaletteItemActive={isPaletteItemActive}
                />
              ))}
              {isOver && isPaletteItemActive && blocks.length > 0 && (
                <div className="h-1 my-4 rounded-full bg-[#0f0f14]" />
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CanvasMode;
