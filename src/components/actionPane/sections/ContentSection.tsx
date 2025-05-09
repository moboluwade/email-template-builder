import React from "react";
import PropertySection from "../helperComps/PropertySection";
import {
  ListItemsInput,
  RangeInput,
  SelectInput,
  TableEditor,
  TextareaInput,
  TextInput,
} from "../helperComps/InputComponents";
import { useTemplateStore } from "@/stores/useTemplateStore";

const ContentSection = () => {
  const { selectedBlockId, blocks, handleChange, handleStyleChange } =
    useTemplateStore();

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);

  if (!selectedBlock) return <></>;

  return (
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
            value={selectedBlock.styles.width}
            onChange={(value) => handleStyleChange("width", value)}
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
          onChange={(value) => handleStyleChange("height", Number(value))}
        />
      )}

      {selectedBlock.type === "divider" && (
        <>
          <RangeInput
            label="Thickness"
            value={selectedBlock.styles.thickness}
            min={1}
            max={10}
            step={1}
            onChange={(value) => handleStyleChange("thickness", Number(value))}
          />
          <SelectInput
            label="Style"
            value={selectedBlock.styles?.style}
            options={[
              { value: "solid", label: "Solid" },
              { value: "dashed", label: "Dashed" },
              { value: "dotted", label: "Dotted" },
            ]}
            onChange={(value) => handleStyleChange("style", value)}
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
          <ListItemsInput
            items={selectedBlock.content.items}
            onChange={(items) => handleChange("items", items)}
          />
        </>
      )}

      {selectedBlock.type === "table" && (
        <TableEditor
          data={selectedBlock.content.data}
          onChange={(data) => handleChange("data", data)}
        />
      )}
    </PropertySection>
  );
};

export default ContentSection;
