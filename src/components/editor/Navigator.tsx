import { useTemplateStore } from "@/stores/useTemplateStore";
import { Code, Edit2, Eye } from "lucide-react";

const Modes = [
  { label: "Canvas", icon: <Edit2 size={16} />, value: "canvas" },
  { label: "Preview", icon: <Eye size={16} />, value: "preview" },
  { label: "HTML", icon: <Code size={16} />, value: "html" },
] as const;

interface NavigatorProps {
  setHtmlCode: React.Dispatch<React.SetStateAction<string>>;
}
const Navigator: React.FC<NavigatorProps> = ({ setHtmlCode }) => {
  const { mode, setMode, getHtmlOutput } = useTemplateStore();

  const handleModeChange = (newMode: "canvas" | "preview" | "html") => {
    if (newMode === "html") {
      setHtmlCode(getHtmlOutput());
    }
    setMode(newMode);
  };

  const handleExport = () => {
    const html = getHtmlOutput();
    // In a real app, you might want to offer download options or copy to clipboard
    console.log("Exported HTML:", html);
    alert("HTML exported to console");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#0f0f14] border-b ">
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
              ? "bg-[#620e98] text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <button
        className="px-4 py-2 text-white transition-colors rounded-md bg-primary hover:bg-opacity-90"
        onClick={handleExport}
      >
        Export
      </button>
    </div>
  );
};

export default Navigator;
