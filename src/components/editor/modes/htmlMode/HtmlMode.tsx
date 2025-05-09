import CopyButton from "@/components/reuseable/CopyButton";
import { useTemplateStore } from "@/stores/useTemplateStore";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const HtmlMode = () => {
  const [htmlCode, setHtmlCode] = useState("");
  const { mode, blocks, getHtmlOutput } = useTemplateStore();

  useEffect(() => {
    // Update HTML code when blocks change ; rather than prop drill.
    const htmlCode = getHtmlOutput();
    setHtmlCode(htmlCode);
  }, [blocks]);

  return (
    <>
      {mode === "html" && (
        <div className="w-full relative max-w-[48rem] h-full mx-auto overflow-x-hidden overflow-y-hidden text-black rounded-xl bg-black shadow-sm ">
          <CopyButton />
          <SyntaxHighlighter
            language="htmlbars"
            style={a11yDark}
            customStyle={{
              padding: "1rem",
              borderRadius: "0.5rem",
              fontSize: "0.75rem",
              backgroundColor: "#282c34",
              width: "100%",
              height: "100%",
            }}
          >
            {htmlCode}
          </SyntaxHighlighter>
        </div>
      )}
    </>
  );
};

export default HtmlMode;
