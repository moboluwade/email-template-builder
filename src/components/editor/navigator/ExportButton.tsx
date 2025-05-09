import React from "react";
import { Download, FileCode, FileJson } from "lucide-react";
import { useTemplateStore } from "@/stores/useTemplateStore";
import { Tooltip } from "./Tooltip";
import { DropdownMenu } from "@/components/reuseable/DropdownMenu";

const ExportButton = () => {
  const { blocks, getHtmlOutput } = useTemplateStore();

  const handleExportHtml = () => {
    const html = getHtmlOutput();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    // In a real app, you would serialize your template data to JSON

    const json = JSON.stringify(blocks, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportItems = [
    {
      icon: <FileCode className="w-4 h-4" />,
      label: "Export as HTML",
      onClick: handleExportHtml,
    },
    {
      icon: <FileJson className="w-4 h-4" />,
      label: "Export as JSON",
      onClick: handleExportJson,
    },
  ];
  return (
    <Tooltip content="Export Template">
      <DropdownMenu
        trigger={
          <button className="p-2 text-white transition-colors bg-[#81228B] rounded-md hover:bg-opacity-90">
            <Download size={18} />
          </button>
        }
        items={exportItems}
      />
    </Tooltip>
  );
};

export default ExportButton;
