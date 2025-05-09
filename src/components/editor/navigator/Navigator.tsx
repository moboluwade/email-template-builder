"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";
import { Code, Edit2, Eye } from "lucide-react";
import ExportButton from "./ExportButton";
import ConnectProviderButton from "./provider/ConnectProviderButton";

const Modes = [
  { label: "Canvas", icon: <Edit2 size={16} />, value: "canvas" },
  { label: "Preview", icon: <Eye size={16} />, value: "preview" },
  { label: "HTML", icon: <Code size={16} />, value: "html" },
] as const;

const Navigator = () => {
  const { mode, setMode } = useTemplateStore();

  const handleModeChange = (newMode: "canvas" | "preview" | "html") => {
    setMode(newMode);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#0f0f14] border-b">
      <div className="flex space-x-4">
        {Modes.map(({ label, icon, value }) => {
          const isActive = mode === value;
          return (
            <button
              key={value}
              onClick={() => handleModeChange(value)}
              className={`px-3 py-1 rounded-md flex items-center space-x-1 transition-all duration-200
                ${
                  isActive
                    ? "bg-[#81228B] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-3">
        
        <ExportButton />
        <ConnectProviderButton />
      </div>
    </div>
  );
};

export default Navigator;
