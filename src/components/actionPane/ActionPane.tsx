"use client";
import { useTemplateStore } from "@/stores/useTemplateStore";
import { Trash2 } from "lucide-react";
import StyleSection from "./sections/StyleSection";
import ContentSection from "./sections/ContentSection";
import LayoutSection from "./sections/LayoutSection";
import { useEffect } from "react";

export default function ActionPane() {
  const { selectedBlockId, blocks, handleDelete } = useTemplateStore();

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="bg-[#0f0f14] border-l border-gray-800 h-screen p-4 min-w-60 w-60 flex-shrink-0 text-white">
        <h2 className="mb-4 text-xl font-semibold text-center">Properties</h2>
        <div className="flex flex-col items-center justify-center h-[80%] text-gray-400">
          <p className="text-center">Select a block to edit its properties</p>
        </div>
      </div>
    );
  }

  const blockTitle =
    selectedBlock.type.charAt(0).toUpperCase() + selectedBlock.type.slice(1);

  return (
    <div className="bg-[#0f0f14] border-l border-gray-800 h-screen overflow-y-auto p-4 min-w-60 w-60 flex-shrink-0 text-white">
      <div className="sticky top-0 flex justify-between pb-6 bg-[#0f0f14] w-48 z-10">
        
        {/* Header Section */}
        <h2 className="text-xl font-semibold">{blockTitle}</h2>
        <div className="flex space-x-2">
          {/* <button
            onClick={handleDuplicate}
            className="p-1.5 rounded-full hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
            aria-label="Duplicate block"
            title="Duplicate block"
          >
            <Copy size={18} />
          </button> */}
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-full hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
            aria-label="Delete block"
            title="Delete block"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Content Section */}
        <ContentSection />

        {/* Style Section */}
        <StyleSection />

        {/* Layout Section */}
        <LayoutSection />

        {/* Actions Section */}
      </div>
    </div>
  );
}
