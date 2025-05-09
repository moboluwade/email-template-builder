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
    icon: <Type size={15} />,
    label: "Header",
  },
  {
    type: "paragraph",
    icon: <Type size={15} className="opacity-70" />,
    label: "Paragraph",
  },
  {
    type: "button",
    icon: <ButtonIcon size={15} />,
    label: "Button",
  },
  {
    type: "image",
    icon: <ImageIcon size={15} />,
    label: "Image",
  },
  {
    type: "table",
    icon: <Table size={15} />,
    label: "Table",
  },
  {
    type: "list",
    icon: <List size={15} />,
    label: "List",
  },
  {
    type: "divider",
    icon: <Divide size={15} />,
    label: "Divider",
  },
  {
    type: "spacer",
    icon: <Maximize size={15} />,
    label: "Spacer",
  },
];
