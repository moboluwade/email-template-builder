import { useRef, useState } from "react";

// Custom tooltip component; didn't want to use shadcn
export const Tooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => {
  const [show, setShow] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div
          ref={tooltipRef}
          className="absolute z-50 px-2 py-1 text-xs font-medium text-white transform -translate-x-1/2 bg-gray-800 rounded-md left-1/2 top-10 mb-2"
        >
          {content}
          <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 left-1/2 -ml-1 -top-1"></div>
        </div>
      )}
    </div>
  );
};