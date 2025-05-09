import React from "react";
import PropertySection from "../helperComps/PropertySection";
import { ColorInput } from "../helperComps/InputComponents";
import { useTemplateStore } from "@/stores/useTemplateStore";

interface StyleSectionProps {
  selectedBlock: any;
  handleChange: any;
  handleStyleChange: any;
}
const StyleSection = () => {
  const { selectedBlockId, blocks, handleStyleChange, handleChange } =
    useTemplateStore();

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);

  if (!selectedBlock) return <></>;

  return (
    <>
      {["header", "paragraph", "button", "divider"].includes(
        selectedBlock.type
      ) && (
        <PropertySection title="Style">
          {["header", "paragraph"].includes(selectedBlock.type) &&
            (() => {
              //   console.log(selectedBlock);
              return (
                <ColorInput
                  label="Text Color"
                  value={selectedBlock.styles.color}
                  onChange={(value) => handleStyleChange("color", value)}
                />
              );
            })()}

          {selectedBlock.type === "button" &&
            (() => {
              // (console.log(selectedBlock),
              return (
                <>
                  <ColorInput
                    label="Background"
                    value={selectedBlock.styles.backgroundColor}
                    onChange={(value) =>
                      handleStyleChange("backgroundColor", value)
                    }
                  />
                  <ColorInput
                    label="Text Color"
                    value={selectedBlock.styles.color}
                    onChange={(value) => handleStyleChange("color", value)}
                  />
                </>
              );
            })()}

          {selectedBlock.type === "divider" && (
            <ColorInput
              label="Color"
              value={selectedBlock.styles.color}
              onChange={(value) => handleChange("color", value)}
            />
          )}
        </PropertySection>
      )}
    </>
  );
};

export default StyleSection;
