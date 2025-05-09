import { X } from "lucide-react";

// Input Components
 interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function TextInput({ label, value, onChange }: TextInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-300">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

interface TextareaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function TextareaInput({ label, value, onChange }: TextareaInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-300">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

interface SelectInputProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function SelectInput({ label, value, options, onChange }: SelectInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-300">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 overflow-hidden rounded-lg cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 w-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-white"
        />
      </div>
    </div>
  );
}

interface RangeInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: string) => void;
}

function RangeInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: RangeInputProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm text-gray-300">{label}</label>
        <span className="text-sm text-gray-400">{value}px</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-primary"
      />
    </div>
  );
}

interface AlignmentSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

function AlignmentSelector({ value, onChange }: AlignmentSelectorProps) {
  return (
    <div>
      <label className="block mb-2 text-sm text-gray-300">Alignment</label>
      <div className="flex space-x-1">
        {["left", "center", "right"].map((align) => (
          <button
            key={align}
            onClick={() => onChange(align)}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              value === align
                ? "bg-primary text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {align.charAt(0).toUpperCase() + align.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ListItemsInputProps {
  items: string[];
  onChange: (items: string[]) => void;
}

function ListItemsInput({ items, onChange }: ListItemsInputProps) {
  const addItem = () => {
    onChange([...items, "New item"]);
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-gray-300">List Items</label>
        <button
          onClick={addItem}
          className="px-2 py-1 text-xs transition-colors bg-gray-700 rounded-md hover:bg-gray-600"
        >
          Add Item
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-white"
            />
            <button
              onClick={() => removeItem(index)}
              className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
              aria-label="Remove item"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface TableEditorProps {
  data: string[][];
  onChange: (data: string[][]) => void;
}

function TableEditor({ data, onChange }: TableEditorProps) {
  const addRow = () => {
    const newRow = Array(data[0].length).fill("");
    onChange([...data, newRow]);
  };

  const addColumn = () => {
    const newData = data.map((row) => [...row, ""]);
    onChange(newData);
  };

  const removeRow = (rowIndex: number) => {
    if (data.length <= 1) return;
    const newData = data.filter((_, index) => index !== rowIndex);
    onChange(newData);
  };

  const removeColumn = (colIndex: number) => {
    if (data[0].length <= 1) return;
    const newData = data.map((row) =>
      row.filter((_, index) => index !== colIndex)
    );
    onChange(newData);
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    onChange(newData);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-gray-300">Table Data</label>
        <div className="flex space-x-2">
          <button
            onClick={addRow}
            className="px-2 py-1 text-xs transition-colors bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Add Row
          </button>
          <button
            onClick={addColumn}
            className="px-2 py-1 text-xs transition-colors bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Add Column
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="p-1">
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        updateCell(rowIndex, colIndex, e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                ))}
                <td className="w-8 p-1">
                  <button
                    onClick={() => removeRow(rowIndex)}
                    className="p-1 text-gray-400 transition-colors hover:text-red-400"
                    aria-label="Remove row"
                    disabled={data.length <= 1}
                  >
                    <X size={14} />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              {data[0].map((_, colIndex) => (
                <td key={colIndex} className="p-1">
                  <button
                    onClick={() => removeColumn(colIndex)}
                    className="flex justify-center w-full p-1 text-gray-400 transition-colors hover:text-red-400"
                    aria-label="Remove column"
                    disabled={data[0].length <= 1}
                  >
                    <X size={14} />
                  </button>
                </td>
              ))}
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export {
  TextInput,
  TextareaInput,
  SelectInput,
  ColorInput,
  RangeInput,
  AlignmentSelector,
  ListItemsInput,
  TableEditor,
  TextInputProps,
  TextareaInputProps,
  SelectInputProps,
  ColorInputProps,
  RangeInputProps,
  AlignmentSelectorProps,
  ListItemsInputProps,
  TableEditorProps,
};