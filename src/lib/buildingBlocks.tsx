import { BlockType } from "@/stores/useTemplateStore";
import {
  Type,
  BoxIcon as ButtonIcon,
  ImageIcon,
  Table,
  List,
  Divide,
  Maximize,
} from "lucide-react";

export interface BuildingBlock {
  type: BlockType;
  icon: React.ReactNode;
  label: string;
}

export const buildingBlocks: BuildingBlock[] = [
  {
    type: "header",
    icon: <Type size={20} />,
    label: "Header",
  },
  {
    type: "paragraph",
    icon: <Type size={20} className="opacity-70" />,
    label: "Paragraph",
  },
  {
    type: "button",
    icon: <ButtonIcon size={20} />,
    label: "Button",
  },
  {
    type: "image",
    icon: <ImageIcon size={20} />,
    label: "Image",
  },
  {
    type: "table",
    icon: <Table size={20} />,
    label: "Table",
  },
  {
    type: "list",
    icon: <List size={20} />,
    label: "List",
  },
  {
    type: "divider",
    icon: <Divide size={20} />,
    label: "Divider",
  },
  {
    type: "spacer",
    icon: <Maximize size={20} />,
    label: "Spacer",
  },
];
