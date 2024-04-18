import type { IconType } from "react-icons";
import { AiOutlineStock } from "react-icons/ai";
import { FaBitcoin, FaMoneyBill, FaLayerGroup } from "react-icons/fa";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { RiFilePaper2Fill } from "react-icons/ri";
import type { InvestmentType } from "../types/investment";
import { Icon, type IconProps } from "@chakra-ui/react";

export const investmentTypeToIcon: Record<InvestmentType, IconType> = {
  stock: AiOutlineStock,
  crypto: FaBitcoin,
  forex: FaMoneyBill,
  index: FaLayerGroup,
  option: RiFilePaper2Fill,
  other: HiOutlineDotsCircleHorizontal,
};

interface InvestmentIconsProps extends IconProps {
  type: InvestmentType;
}

export function InvestmentIcon({ type, ...props }: InvestmentIconsProps) {
  return <Icon {...props} as={investmentTypeToIcon[type]} />;
}
