import { Copy, Trash2 } from "lucide-react";

const ActionSection = () => {
  return (
    <div className="pt-4 border-t border-gray-700">
      <div className="flex gap-2">
        <button
          className="flex-1 py-2.5 bg-blue-500/20 text-blue-300 rounded-md hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
          //   onClick={handleDuplicate}
        >
          <Copy size={16} />
          <span>Duplicate</span>
        </button>
        <button
          className="flex-1 py-2.5 bg-red-500/20 text-red-300 rounded-md hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
          //   onClick={handleDelete}
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default ActionSection;
