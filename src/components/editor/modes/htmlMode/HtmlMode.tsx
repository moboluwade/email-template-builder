import { useTemplateStore } from "@/stores/useTemplateStore";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const HtmlMode = ({ htmlCode }: { htmlCode: string }) => {
  const { mode } = useTemplateStore();

  return (
    <>
      {mode === "html" && (
        <div className="w-full h-full p-4 mx-auto text-black bg-white shadow-sm">
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
