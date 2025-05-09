import { useTemplateStore } from "@/stores/useTemplateStore";
import { BlockRenderer } from "../../BlockRenderer";

const PreviewMode = () => {
  const { mode, getHtmlOutput, blocks } = useTemplateStore();
  // console.log(getHtmlOutput());
  return (
    <>
      {mode === "preview" && (
        <div className="w-full min-h-full p-4 mx-auto bg-white rounded-lg shadow-sm">
          {/* <div dangerouslySetInnerHTML={{ __html: getHtmlOutput() }} /> */}
          {
            blocks.map((block)=>{
              return (
                  <BlockRenderer block={block} />
                // <div className="w-full min-h-full p-4 mx-auto bg-white shadow-sm">
                //   {/* <div dangerouslySetInnerHTML={{ __html: getHtmlOutput() }} /> */}
                // </div>
              )
            })
          }
        </div>
      )}
    </>
  );
};

export default PreviewMode;
