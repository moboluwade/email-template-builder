import { useTemplateStore } from "@/stores/useTemplateStore";

const PreviewMode = () => {
  const { mode, getHtmlOutput } = useTemplateStore();

  return (
    <>
      {mode === "preview" && (
        <div className="w-full h-full p-4 mx-auto bg-white shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: getHtmlOutput() }} />
        </div>
      )}
    </>
  );
};

export default PreviewMode;
