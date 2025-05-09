import type { Block } from "@/stores/useTemplateStore";

interface BlockRendererProps {
  block: Block;
}

// Centralized styles for headers
const HeaderStylesCSS = {
  h1: {
    fontSize: "2.25rem",
    fontWeight: "bold",
  },
  h2: {
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  h3: {
    fontSize: "1.25rem",
    fontWeight: "600",
  },
};

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case "header": {
      const level = block.content.level;
      return (
        // Apply block.styles to the outermost wrapper
        <div style={block.styles}>
          {level === "h1" && (
            <table
              width="100%"
              border={0}
              cellPadding={0}
              cellSpacing={0}
              style={block.styles}
            >
              <tr>
                <td>
                  {/* content goes here */}
                  <h1
                    style={{
                      ...HeaderStylesCSS.h1,
                      color: block.content.color,
                      textAlign: block.content.align as any,
                    }}
                  >
                    {block.content.text}
                  </h1>
                </td>
              </tr>
            </table>
          )}
          {level === "h2" && (
            <h2
              style={{
                ...HeaderStylesCSS.h2,
                color: block.content.color,
                textAlign: block.content.align as any,
              }}
            >
              {block.content.text}
            </h2>
          )}
          {level === "h3" && (
            <h3
              style={{
                ...HeaderStylesCSS.h3,
                color: block.content.color,
                textAlign: block.content.align as any,
              }}
            >
              {block.content.text}
            </h3>
          )}
        </div>
      );
    }

    case "paragraph":
      return (
        //  Wrap in a div to apply block.styles
        <div style={block.styles}>
          <p
            style={{
              color: block.content.color,
              textAlign: block.content.align as any,
            }}
          >
            {block.content.text}
          </p>
        </div>
      );

    case "button":
      return (
        //  Apply block.styles to outer wrapper and preserve alignment
        <div
          style={{
            // ...block.styles,
            textAlign: block.content.align as any,
            padding: "0.25rem 2rem",
            // block.styles.textAlign
          }}
        >
          <button className="rounded-md" style={{ ...block.styles }}>
            {block.content.text}
          </button>
        </div>
      );

    case "image":
      return (
        //  Apply block.styles to outer wrapper and preserve alignment
        // Structure for ONE block (assuming this is repeated)
        <div
          style={{
            ...block.styles,
            width: "100%", // Outer container takes full width
            textAlign: block.content.align as any, // Outer container handles text/inline-block alignment
          }}
        >
          {block.content.src ? (
            <img
              src={block.content.src || "/placeholder.svg"}
              alt={block.content.alt}
              style={{
                width: block.styles.width, // Image width controlled by block.styles
                display: "inline-block", // Ensure image behaves like inline-block for textAlign
              }}
              className="max-w-full" // Responsive safeguard
            />
          ) : (
            // Placeholder: Always 100% width, text centered via flex
            <div
              className="flex items-center justify-center bg-gray-200"
              style={{
                width: block.styles.width, // Image width controlled by block.styles
                height: "150px",
                display: "inline-block", // Ensure image behaves like inline-block for textAlign
              }}
            >
              <span className="text-gray-500 ">Image Placeholder</span>
            </div>
          )}
        </div>
      );

    case "divider":
      return (
        //  Apply block.styles if needed (optional here)
        <div style={block.styles}>
          <hr
            style={{
              borderTop: `${block.content.thickness}px ${block.content.style} ${block.content.color}`,
              margin: "1rem 0",
            }}
          />
        </div>
      );

    case "spacer":
      return (
        //  Apply block.styles to allow custom padding/margin etc.
        <div
          style={{ height: `${block.content.height}px`, ...block.styles }}
        ></div>
      );

    case "list":
      const ListTag = block.content.type === "ordered" ? "ol" : "ul";
      const listClass =
        block.content.type === "ordered" ? "list-decimal" : "list-disc";
      return (
        // Wrap list in a div for block.styles
        <div style={block.styles}>
          <ListTag className={`pl-5 ${listClass}`}>
            {block.content.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ListTag>
        </div>
      );

    case "table":
      return (
        <div style={{ padding: "0.25rem 2rem" }}>
          <table
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            border={0}
            style={{
              borderCollapse: "collapse",
              width: "100%",
              tableLayout: "fixed", // forces the table to distribute width evenly first then expand.
              ...block.styles, // allows padding, margin etc.
            }}
          >
            <tbody>
              {block.content.data.map((row: string[], rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.map((cell: string, cellIndex: number) => (
                    <td
                      key={cellIndex}
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        textAlign: "left",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return <div>Unknown block type: {block.type}</div>;
  }
}
