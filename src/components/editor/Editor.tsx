"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";
import { Code, Eye, Edit2 } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { BlockRenderer } from "./BlockRenderer";

export default function Editor() {
  const {
    blocks,
    mode,
    setMode,
    getHtmlOutput,
    addBlock,
    selectBlock,
    selectedBlockId,
  } = useTemplateStore();
  const [htmlCode, setHtmlCode] = useState("");

  const { setNodeRef, isOver } = useDroppable({
    id: "editor-droppable",
  });

  const handleExport = () => {
    const html = getHtmlOutput();
    // In a real app, you might want to offer download options or copy to clipboard
    console.log("Exported HTML:", html);
    alert("HTML exported to console");
  };

  const handleModeChange = (newMode: "editor" | "preview" | "html") => {
    if (newMode === "html") {
      setHtmlCode(getHtmlOutput());
    }
    setMode(newMode);
  };

  return (
    <div className="flex flex-col flex-1 h-screen">
      {/* Editor Navigation */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex space-x-4">
          <button
            className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
              mode === "editor"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleModeChange("editor")}
          >
            <Edit2 size={16} />
            <span>Editor</span>
          </button>
          <button
            className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
              mode === "preview"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleModeChange("preview")}
          >
            <Eye size={16} />
            <span>Preview</span>
          </button>
          <button
            className={`px-3 py-1 rounded-md flex items-center space-x-1 ${
              mode === "html"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleModeChange("html")}
          >
            <Code size={16} />
            <span>HTML</span>
          </button>
        </div>

        <button
          className="px-4 py-2 text-white transition-colors rounded-md bg-primary hover:bg-opacity-90"
          onClick={handleExport}
        >
          Export
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-6 overflow-auto bg-background">
        {mode === "editor" && (
          <div
            ref={setNodeRef}
            className={`bg-white rounded-lg shadow-sm min-h-[600px] max-w-[600px] mx-auto p-4 ${
              isOver ? "ring-2 ring-primary ring-opacity-50" : ""
            }`}
          >
            {blocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <p>Drag and drop building blocks here</p>
                <p className="mt-2 text-sm">
                  or click on a block in the palette
                </p>
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

        {mode === "preview" && (
          <div className="bg-white rounded-lg shadow-sm min-h-[600px] max-w-[600px] mx-auto p-4">
            <div dangerouslySetInnerHTML={{ __html: getHtmlOutput() }} />
          </div>
        )}

        {mode === "html" && (
          <div className="bg-white rounded-lg shadow-sm min-h-[600px] max-w-[600px] mx-auto p-4">
            <pre className="p-4 overflow-auto text-xs bg-gray-100 rounded-md">
              {htmlCode}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
