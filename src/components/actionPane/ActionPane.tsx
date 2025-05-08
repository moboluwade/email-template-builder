"use client"

import type React from "react"

import { useState } from "react"
import { useTemplateStore } from "@/stores/useTemplateStore"
import { X, ChevronDown, ChevronUp, Trash2, Copy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ActionPane() {
  const { selectedBlockId, blocks, updateBlock, removeBlock } = useTemplateStore()

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId)

  if (!selectedBlock) {
    return (
      <div className="w-64 bg-[#0f0f14] border-l border-gray-800 h-screen p-4 flex-shrink-0 text-white">
        <h2 className="mb-4 text-xl font-semibold text-center">Properties</h2>
        <div className="flex flex-col items-center justify-center h-[80%] text-gray-400">
          <p className="text-center">Select a block to edit its properties</p>
        </div>
      </div>
    )
  }

  const handleChange = (key: string, value: any) => {
    updateBlock(selectedBlock.id, { [key]: value })
  }

  const handleDelete = () => {
    removeBlock(selectedBlock.id)
  }

  const handleDuplicate = () => {
    // duplicateBlock(selectedBlock.id)
  }

  const blockTitle = selectedBlock.type.charAt(0).toUpperCase() + selectedBlock.type.slice(1)

  return (
    <div className="bg-[#0f0f14] border-l border-gray-800 h-screen overflow-y-auto p-4 w-60 text-white">
      <div className="sticky top-0 flex justify-between pb-6 bg-[#0f0f14] w-48 z-10">
        <h2 className="text-xl font-semibold">{blockTitle}</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleDuplicate}
            className="p-1.5 rounded-full hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
            aria-label="Duplicate block"
            title="Duplicate block"
          >
            <Copy size={18} />
          </button>
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
        <PropertySection title="Content">
          {selectedBlock.type === "header" && (
            <>
              <TextInput
                label="Text"
                value={selectedBlock.content.text}
                onChange={(value) => handleChange("text", value)}
              />
              <SelectInput
                label="Level"
                value={selectedBlock.content.level}
                options={[
                  { value: "h1", label: "Heading 1 (Large)" },
                  { value: "h2", label: "Heading 2 (Medium)" },
                  { value: "h3", label: "Heading 3 (Small)" },
                ]}
                onChange={(value) => handleChange("level", value)}
              />
            </>
          )}

          {selectedBlock.type === "paragraph" && (
            <TextareaInput
              label="Text"
              value={selectedBlock.content.text}
              onChange={(value) => handleChange("text", value)}
            />
          )}

          {selectedBlock.type === "button" && (
            <>
              <TextInput
                label="Text"
                value={selectedBlock.content.text}
                onChange={(value) => handleChange("text", value)}
              />
              <TextInput
                label="URL"
                value={selectedBlock.content.url}
                onChange={(value) => handleChange("url", value)}
              />
            </>
          )}

          {selectedBlock.type === "image" && (
            <>
              <TextInput
                label="Image URL"
                value={selectedBlock.content.src}
                onChange={(value) => handleChange("src", value)}
              />
              <TextInput
                label="Alt Text"
                value={selectedBlock.content.alt}
                onChange={(value) => handleChange("alt", value)}
              />
              <TextInput
                label="Width"
                value={selectedBlock.content.width}
                onChange={(value) => handleChange("width", value)}
              />
            </>
          )}

          {selectedBlock.type === "spacer" && (
            <RangeInput
              label="Height"
              value={selectedBlock.content.height}
              min={5}
              max={100}
              step={5}
              onChange={(value) => handleChange("height", Number(value))}
            />
          )}

          {selectedBlock.type === "divider" && (
            <>
              <RangeInput
                label="Thickness"
                value={selectedBlock.content.thickness}
                min={1}
                max={10}
                step={1}
                onChange={(value) => handleChange("thickness", Number(value))}
              />
              <SelectInput
                label="Style"
                value={selectedBlock.content.style}
                options={[
                  { value: "solid", label: "Solid" },
                  { value: "dashed", label: "Dashed" },
                  { value: "dotted", label: "Dotted" },
                ]}
                onChange={(value) => handleChange("style", value)}
              />
            </>
          )}

          {selectedBlock.type === "list" && (
            <>
              <SelectInput
                label="List Type"
                value={selectedBlock.content.type}
                options={[
                  { value: "unordered", label: "Bullet Points" },
                  { value: "ordered", label: "Numbered" },
                ]}
                onChange={(value) => handleChange("type", value)}
              />
              <ListItemsInput items={selectedBlock.content.items} onChange={(items) => handleChange("items", items)} />
            </>
          )}

          {selectedBlock.type === "table" && (
            <TableEditor data={selectedBlock.content.data} onChange={(data) => handleChange("data", data)} />
          )}
        </PropertySection>

        {/* Style Section */}
        {["header", "paragraph", "button", "divider"].includes(selectedBlock.type) && (
          <PropertySection title="Style">
            {["header", "paragraph"].includes(selectedBlock.type) && (
              <ColorInput
                label="Text Color"
                value={selectedBlock.content.color}
                onChange={(value) => handleChange("color", value)}
              />
            )}

            {selectedBlock.type === "button" && (
              <>
                <ColorInput
                  label="Background"
                  value={selectedBlock.content.backgroundColor}
                  onChange={(value) => handleChange("backgroundColor", value)}
                />
                <ColorInput
                  label="Text Color"
                  value={selectedBlock.content.textColor}
                  onChange={(value) => handleChange("textColor", value)}
                />
              </>
            )}

            {selectedBlock.type === "divider" && (
              <ColorInput
                label="Color"
                value={selectedBlock.content.color}
                onChange={(value) => handleChange("color", value)}
              />
            )}
          </PropertySection>
        )}

        {/* Layout Section */}
        {["header", "paragraph", "button", "image"].includes(selectedBlock.type) && (
          <PropertySection title="Layout">
            <AlignmentSelector value={selectedBlock.content.align} onChange={(value) => handleChange("align", value)} />
          </PropertySection>
        )}

        {/* Actions Section */}
        <div className="pt-4 border-t border-gray-700">
          <div className="flex gap-2">
            <button
              className="flex-1 py-2.5 bg-blue-500/20 text-blue-300 rounded-md hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
              onClick={handleDuplicate}
            >
              <Copy size={16} />
              <span>Duplicate</span>
            </button>
            <button
              className="flex-1 py-2.5 bg-red-500/20 text-red-300 rounded-md hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
              onClick={handleDelete}
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Property Section Component
interface PropertySectionProps {
  title: string
  children: React.ReactNode
}

function PropertySection({ title, children }: PropertySectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="overflow-hidden border border-gray-700 rounded-md">
      <button
        className="flex items-center justify-between w-full p-3 transition-colors bg-gray-800/50 hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-3 space-y-3 bg-gray-800/20"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Input Components
interface TextInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function TextInput({ label, value, onChange }: TextInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-300">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  )
}

interface TextareaInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function TextareaInput({ label, value, onChange }: TextareaInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-300">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  )
}

interface SelectInputProps {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

function SelectInput({ label, value, options, onChange }: SelectInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

interface ColorInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-300">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 overflow-hidden rounded-lg cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 w-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-white"
        />
      </div>
    </div>
  )
}

interface RangeInputProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: string) => void
}

function RangeInput({ label, value, min, max, step, onChange }: RangeInputProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm text-gray-300">{label}</label>
        <span className="text-sm text-gray-400">{value}px</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-primary"
      />
    </div>
  )
}

interface AlignmentSelectorProps {
  value: string
  onChange: (value: string) => void
}

function AlignmentSelector({ value, onChange }: AlignmentSelectorProps) {
  return (
    <div>
      <label className="block mb-2 text-sm text-gray-300">Alignment</label>
      <div className="flex space-x-1">
        {["left", "center", "right"].map((align) => (
          <button
            key={align}
            onClick={() => onChange(align)}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              value === align ? "bg-primary text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {align.charAt(0).toUpperCase() + align.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

interface ListItemsInputProps {
  items: string[]
  onChange: (items: string[]) => void
}

function ListItemsInput({ items, onChange }: ListItemsInputProps) {
  const addItem = () => {
    onChange([...items, "New item"])
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    onChange(newItems)
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    onChange(newItems)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-gray-300">List Items</label>
        <button
          onClick={addItem}
          className="px-2 py-1 text-xs transition-colors bg-gray-700 rounded-md hover:bg-gray-600"
        >
          Add Item
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-white"
            />
            <button
              onClick={() => removeItem(index)}
              className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
              aria-label="Remove item"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

interface TableEditorProps {
  data: string[][]
  onChange: (data: string[][]) => void
}

function TableEditor({ data, onChange }: TableEditorProps) {
  const addRow = () => {
    const newRow = Array(data[0].length).fill("")
    onChange([...data, newRow])
  }

  const addColumn = () => {
    const newData = data.map((row) => [...row, ""])
    onChange(newData)
  }

  const removeRow = (rowIndex: number) => {
    if (data.length <= 1) return
    const newData = data.filter((_, index) => index !== rowIndex)
    onChange(newData)
  }

  const removeColumn = (colIndex: number) => {
    if (data[0].length <= 1) return
    const newData = data.map((row) => row.filter((_, index) => index !== colIndex))
    onChange(newData)
  }

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...data]
    newData[rowIndex][colIndex] = value
    onChange(newData)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-gray-300">Table Data</label>
        <div className="flex space-x-2">
          <button
            onClick={addRow}
            className="px-2 py-1 text-xs transition-colors bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Add Row
          </button>
          <button
            onClick={addColumn}
            className="px-2 py-1 text-xs transition-colors bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Add Column
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="p-1">
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      className="w-full px-2 py-1 text-sm text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                ))}
                <td className="w-8 p-1">
                  <button
                    onClick={() => removeRow(rowIndex)}
                    className="p-1 text-gray-400 transition-colors hover:text-red-400"
                    aria-label="Remove row"
                    disabled={data.length <= 1}
                  >
                    <X size={14} />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              {data[0].map((_, colIndex) => (
                <td key={colIndex} className="p-1">
                  <button
                    onClick={() => removeColumn(colIndex)}
                    className="flex justify-center w-full p-1 text-gray-400 transition-colors hover:text-red-400"
                    aria-label="Remove column"
                    disabled={data[0].length <= 1}
                  >
                    <X size={14} />
                  </button>
                </td>
              ))}
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
