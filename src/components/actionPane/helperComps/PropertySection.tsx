import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Property Section Component
export interface PropertySectionProps {
  title: string;
  children: React.ReactNode;
}

export default function PropertySection({
  title,
  children,
}: PropertySectionProps) {
  const [isOpen, setIsOpen] = useState(true);

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
  );
}
