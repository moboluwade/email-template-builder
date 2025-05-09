import React from "react";
import PropertySection from "../helperComps/PropertySection";
import { AlignmentSelector } from "../helperComps/InputComponents";
import { useTemplateStore } from "@/stores/useTemplateStore";

const LayoutSection = () => {
  const { selectedBlockId,blocks, handleChange } = useTemplateStore();

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);

  if (!selectedBlock) return <></>;

  return (
    <>
      {["header", "paragraph", "button", "image"].includes(
        selectedBlock.type
      ) && (
        <PropertySection title="Layout">
          <AlignmentSelector
            value={selectedBlock.content.align}
            onChange={(value) => handleChange("align", value)}
          />
        </PropertySection>
      )}
    </>
  );
};

export default LayoutSection;
