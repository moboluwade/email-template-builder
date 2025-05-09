"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useTemplateStore } from "@/stores/useTemplateStore";
import { type BuildingBlock } from "@/lib/buildingBlocks";
import { prebuiltTemplates } from "@/lib/prebuiltTemplates";
import { FileText, Layers } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"blocks" | "templates">("blocks");
  const [templatesearchTerm, setTemplateSearchTerm] = useState<string>("");

  // filters blocks by label search
  const filteredBlocks = buildingBlocks.filter((block) =>
    block.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // filters blocks by template search
 const filteredTemplates = prebuiltTemplates.filter((template) =>
    template.name.toLowerCase().includes(templatesearchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-w-64 w-64 h-screen p-4 overflow-y-auto bg-[#0f0f14] text-white border-r border-gray-200">
      <h2 className="mb-4 text-2xl font-semibold text-center text-white">
        🎨 Palette
      </h2>

      {/* Tab Navigation */}
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab("blocks")}
          className={`flex items-center justify-center gap-1 flex-1 py-2 rounded-l-md transition-colors ${
            activeTab === "blocks"
              ? "bg-[#620e98] text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          <Layers size={16} />
          <span>Blocks</span>
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`flex items-center justify-center gap-1 flex-1 py-2 rounded-r-md transition-colors ${
            activeTab === "templates"
              ? "bg-[#620e98] text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          <FileText size={16} />
          <span>Templates</span>
        </button>
      </div>

      {activeTab === "blocks" && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search blocks..."
              className="w-full px-3 py-2 text-black bg-white border border-white rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {filteredBlocks.map((block) => (
              <DraggableBlock key={block.type} block={block} />
            ))}
          </div>

          <div className="pt-4 mt-auto border-t border-gray-200">
            <div className="text-xs text-gray-500">
              🫡 Drag and drop blocks onto the canvas to build your email
              template.
            </div>
          </div>
        </>
      )}

      {/* Templates Tab Content */}
      {activeTab === "templates" && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full px-3 py-2 text-black bg-white border border-white rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              value={templatesearchTerm}
              onChange={(e) => setTemplateSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 pb-4">
            {filteredTemplates.map((template) => (
              <TemplateItem key={template.id} template={template} />
            ))}
          </div>

          <div className="pt-4 mt-auto border-t border-gray-200">
            <div className="text-xs text-gray-500">
              👌🏾 Click on a template to load it into the editor.
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TemplateItem({
  template,
}: {
  template: (typeof prebuiltTemplates)[number];
}) {
  const { loadTemplate } = useTemplateStore();

  return (
    <motion.div
      onClick={() => loadTemplate(template.blocks)}
      className="flex h-30 flex-col border border-gray-200 bg-white rounded-md cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="h-24 bg-gray-100 flex items-center justify-center">
        <span className="text-sm text-gray-500">{template.name}</span>
      </div>
      <div className="p-2">
        <h3 className="text-xs font-medium text-gray-700 truncate">
          {template.name}
        </h3>
        <p className="text-xs text-gray-500 truncate">{template.description}</p>
      </div>
    </motion.div>
  );
}
