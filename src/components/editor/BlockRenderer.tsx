import type { Block } from "@/stores/useTemplateStore";

interface BlockRendererProps {
  block: Block;
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case "header":
      return (
        <div
          style={{
            color: block.content.color,
            textAlign: block.content.align as any,
          }}
        >
          {block.content.level === "h1" && (
            <h1 className="text-2xl font-bold">{block.content.text}</h1>
          )}
          {block.content.level === "h2" && (
            <h2 className="text-xl font-bold">{block.content.text}</h2>
          )}
          {block.content.level === "h3" && (
            <h3 className="text-lg font-bold">{block.content.text}</h3>
          )}
        </div>
      );

    case "paragraph":
      return (
        <p
          style={{
            color: block.content.color,
            textAlign: block.content.align as any,
          }}
        >
          {block.content.text}
        </p>
      );

    case "button":
      return (
        <div style={{ textAlign: block.content.align as any }}>
          <button
            className="px-4 py-2 rounded-md"
            style={{
              backgroundColor: block.content.backgroundColor,
              color: block.content.textColor,
            }}
          >
            {block.content.text}
          </button>
        </div>
      );

    case "image":
      return (
        <div style={{ textAlign: block.content.align as any }}>
          {block.content.src ? (
            <img
              src={block.content.src || "/placeholder.svg"}
              alt={block.content.alt}
              style={{ width: block.content.width }}
              className="max-w-full"
            />
          ) : (
            <div
              className="flex items-center justify-center bg-gray-200"
              style={{ width: "100%", height: "150px" }}
            >
              <span className="text-gray-500">Image Placeholder</span>
            </div>
          )}
        </div>
      );

    case "divider":
      return (
        <hr
          style={{
            borderTop: `${block.content.thickness}px ${block.content.style} ${block.content.color}`,
            margin: "1rem 0",
          }}
        />
      );

    case "spacer":
      return <div style={{ height: `${block.content.height}px` }}></div>;

    case "list":
      return block.content.type === "ordered" ? (
        <ol className="pl-5 list-decimal">
          {block.content.items.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="pl-5 list-disc">
          {block.content.items.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );

    case "table":
      return (
        <table className="w-full border-collapse">
          <tbody>
            {block.content.data.map((row: string[], rowIndex: number) => (
              <tr key={rowIndex}>
                {row.map((cell: string, cellIndex: number) => (
                  <td key={cellIndex} className="p-2 border border-gray-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );

    default:
      return <div>Unknown block type: {block.type}</div>;
  }
}
