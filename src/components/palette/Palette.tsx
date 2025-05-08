"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useTemplateStore } from "@/stores/useTemplateStore";
import { type BuildingBlock } from "@/lib/buildingBlocks";

interface DraggableBlockProps {
  block: BuildingBlock;
  isOverlay?: boolean;
}

interface PaletteProps {
  buildingBlocks: BuildingBlock[];
}

function DraggableBlock({ block }: DraggableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: block.type,
      data: {
        type: block.type,
      },
    });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  const { addBlock } = useTemplateStore();

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      onClick={() => addBlock(block.type)}
      className={`flex flex-col items-center justify-center p-3 border border-gray-200 bg-white rounded-md cursor-grab hover:border-primary hover:bg-gray-50 transition-colors ${
        isDragging ? "opacity-50" : ""
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...listeners}
      {...attributes}
    >
      <div className="mb-2 text-gray-700">{block.icon}</div>
      <span className="text-xs text-gray-600">{block.label}</span>
    </motion.div>
  );
}

export default function Palette({ buildingBlocks }: PaletteProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlocks = buildingBlocks.filter((block) =>
    block.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-64 h-screen p-4 overflow-y-auto bg-[#0f0f14] text-white border-r border-gray-200">
      <h2 className="mb-4 text-2xl font-semibold text-center text-white">
        Palette
      </h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search blocks..."
          className="w-full px-3 py-2 text-black bg-white border border-white rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {filteredBlocks.map((block) => (
          <DraggableBlock key={block.type} block={block} />
        ))}
      </div>

      <div className="pt-4 mt-auto border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Drag and drop blocks onto the canvas to build your email template.
        </div>
      </div>
    </div>
  );
}
