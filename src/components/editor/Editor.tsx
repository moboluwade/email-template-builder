"use client";

import CanvasMode from "./modes/canvasMode/CanvasMode";
import PreviewMode from "./modes/previewMode/PreviewMode";
import HtmlMode from "./modes/htmlMode/HtmlMode";
import Navigator from "./navigator/Navigator";

interface EditorProps{
  isPaletteItemActive: boolean; 
}

export default function Editor({isPaletteItemActive}: EditorProps) {

  return (
    <div className="flex flex-col flex-1 h-screen bg-[#322A2D]/30">
      {/* Editor Navigation */}
      <Navigator/>

      {/* Editor Content */}
      <div className="flex-1 p-6 overflow-auto">
        <CanvasMode isPaletteItemActive={isPaletteItemActive}/>

        <PreviewMode />

        <HtmlMode />
      </div>
    </div>
  );
}
