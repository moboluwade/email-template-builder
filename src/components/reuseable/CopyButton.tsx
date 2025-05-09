"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CopyIcon, CheckIcon } from "lucide-react";
import { useTemplateStore } from "@/stores/useTemplateStore";

export default function CopyButton() {
  const [copied, setCopied] = useState(false);
  const { getHtmlOutput } = useTemplateStore();

  //   only configured to copy latest html code
  const handleCopy = async () => {
    try {
        // text to code
      const htmlCode = getHtmlOutput();
        // copy to clipboard
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleClick = () => {
    handleCopy();
    setCopied(true);
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0.9 }}
      animate={{
        width: copied ? "auto" : "2.5rem",
      }}
      transition={{
        duration: copied ? 0 : 0.3, // expands fast, collapses slow
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(55, 65, 81, 0.7)",
        borderRadius: "999px",
      }}
      whileTap={{ scale: 0.95 }}
      className={`absolute right-2 top-2 h-10 flex items-center justify-center text-white bg-gray-800 rounded-full px-3 transition-all overflow-hidden`}
    >
      <motion.div
        className="flex items-center gap-1.5"
        animate={{
          x: copied ? 0 : 0,
        }}
      >
        {copied ? (
          <>
            <span className="font-semibold whitespace-nowrap">Copied</span>
            <CheckIcon width={18} height={18} color="white" />
          </>
        ) : (
          <CopyIcon width={20} height={20} color="white" />
        )}
      </motion.div>
    </motion.button>
  );
}
