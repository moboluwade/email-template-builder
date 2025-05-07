"use client"

import { useTemplateStore } from "@/stores/useTemplateStore"

export default function ActionPane() {
  const { selectedBlockId, blocks, updateBlock, removeBlock } = useTemplateStore()

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId)

  if (!selectedBlock) {
    return (
      <div className="w-64 h-screen p-4 bg-white border-l border-gray-200">
        <h2 className="mb-4 text-lg font-semibold text-black">Properties</h2>
        <p className="text-sm text-gray-500">Select a block to edit its properties</p>
      </div>
    )
  }

  const handleChange = (key: string, value: any) => {
    updateBlock(selectedBlock.id, { [key]: value })
  }

  const handleDelete = () => {
    removeBlock(selectedBlock.id)
  }

  // This is a simplified version - you'll want to expand this
  // to handle different block types with different properties
  return (
    <div className="w-64 h-screen p-4 overflow-y-auto bg-white border-l border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-black">
          {selectedBlock.type.charAt(0).toUpperCase() + selectedBlock.type.slice(1)} Properties
        </h2>
      </div>

      <div className="space-y-4">
        {/* Render different properties based on block type */}
        {selectedBlock.type === "header" && (
          <>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Text</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={selectedBlock.content.text}
                onChange={(e) => handleChange("text", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Level</label>
              <select
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={selectedBlock.content.level}
                onChange={(e) => handleChange("level", e.target.value)}
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
              </select>
            </div>
          </>
        )}

        {selectedBlock.type === "paragraph" && (
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Text</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              rows={4}
              value={selectedBlock.content.text}
              onChange={(e) => handleChange("text", e.target.value)}
            />
          </div>
        )}

        {/* Common properties for most block types */}
        {["header", "paragraph", "button"].includes(selectedBlock.type) && (
          <>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Alignment</label>
              <div className="flex space-x-2">
                {["left", "center", "right"].map((align) => (
                  <button
                    key={align}
                    className={`px-3 py-1 border ${selectedBlock.content.align === align ? "bg-[#3b82f6] text-white border-primary" : "bg-white text-gray-700 border-gray-300"} rounded-md`}
                    onClick={() => handleChange("align", align)}
                  >
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Color</label>
              <input
                type="color"
                className="w-full"
                value={selectedBlock.content.color}
                onChange={(e) => handleChange("color", e.target.value)}
              />
            </div>
          </>
        )}

        {/* Delete button */}
        <div className="pt-4 mt-4 border-t border-gray-200">
          <button
            className="w-full px-4 py-2 text-white transition-colors bg-red-500 rounded-md hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete Block
          </button>
        </div>
      </div>
    </div>
  )
}
