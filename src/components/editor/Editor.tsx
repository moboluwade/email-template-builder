"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";
import CanvasMode from "./modes/canvasMode/CanvasMode";
import PreviewMode from "./modes/previewMode/PreviewMode";
import HtmlMode from "./modes/htmlMode/HtmlMode";
import Navigator from "./Navigator";
import { closestCenter, DndContext } from "@dnd-kit/core";

export default function Editor() {
  const { mode, setMode, getHtmlOutput } = useTemplateStore();
  const [htmlCode, setHtmlCode] = useState("");

  return (
    <div className="flex flex-col flex-1 h-screen">
      {/* Editor Navigation */}
      <Navigator setHtmlCode={setHtmlCode} />

      {/* Editor Content */}
      <div className="flex-1 p-6 overflow-auto">
        <CanvasMode />

        <PreviewMode />

        <HtmlMode htmlCode={htmlCode} />
      </div>
    </div>
  );
}
