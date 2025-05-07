"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Type, ImageIcon, BoxIcon as ButtonIcon, List, Table, Divide, Maximize } from "lucide-react"
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { useTemplateStore, type BlockType } from "@/stores/useTemplateStore"

interface BuildingBlock {
  type: BlockType
  icon: React.ReactNode
  label: string
}

interface DraggableBlockProps {
  block: BuildingBlock
  isOverlay?: boolean
}

function DraggableBlock({ block, isOverlay = false }: DraggableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: block.type,
    data: {
      type: block.type,
    },
    disabled: isOverlay,
  })

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined

  const { addBlock } = useTemplateStore()
  
  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      onClick={()=>addBlock(block.type)}
      className={`flex flex-col items-center justify-center p-3 border border-gray-200 rounded-md ${
        isOverlay ? "cursor-grabbing" : "cursor-grab"
      } hover:border-primary hover:bg-gray-50 transition-colors ${isDragging ? "opacity-50" : ""}`}
      whileHover={!isOverlay ? { scale: 1.05 } : undefined}
      whileTap={!isOverlay ? { scale: 0.95 } : undefined}
      {...listeners}
      {...attributes}
    >
      <div className="mb-2 text-gray-700">{block.icon}</div>
      <span className="text-xs text-gray-600">{block.label}</span>
    </motion.div>
  )
}

export default function Palette() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeId, setActiveId] = useState<string | null>(null)
  const { addBlock } = useTemplateStore()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before activation
      },
    }),
  )

  const buildingBlocks: BuildingBlock[] = [
    {
      type: "header",
      icon: <Type size={20} />,
      label: "Header",
    },
    {
      type: "paragraph",
      icon: <Type size={20} className="opacity-70" />,
      label: "Paragraph",
    },
    {
      type: "button",
      icon: <ButtonIcon size={20} />,
      label: "Button",
    },
    {
      type: "image",
      icon: <ImageIcon size={20} />,
      label: "Image",
    },
    {
      type: "table",
      icon: <Table size={20} />,
      label: "Table",
    },
    {
      type: "list",
      icon: <List size={20} />,
      label: "List",
    },
    {
      type: "divider",
      icon: <Divide size={20} />,
      label: "Divider",
    },
    {
      type: "spacer",
      icon: <Maximize size={20} />,
      label: "Spacer",
    },
  ]

  const filteredBlocks = buildingBlocks.filter((block) => block.label.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    // If dropped over the editor (this will be handled in the Editor component)
    // For now, we'll just add the block to the end of the list
    if (over && over.id === "editor-droppable") {
      const blockType = active.data.current?.type as BlockType
      if (blockType) {
        addBlock(blockType)
      }
    }

    setActiveId(null)
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const activeBlock = activeId ? buildingBlocks.find((block) => block.type === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-col w-64 h-screen p-4 overflow-y-auto bg-white border-r border-gray-200">
        <h2 className="mb-4 text-lg font-semibold text-black">Building Blocks</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search blocks..."
            className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
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

        <DragOverlay>
          {activeId ? (
            <DraggableBlock block={buildingBlocks.find((block) => block.type === activeId)!} isOverlay />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  )
}
