import { Icon, type IconProps } from "@chakra-ui/react";

export function HamburgerIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 47 48" fill="none" {...props}>
      <path
        d="M9.79167 14.2083H31.3333"
        stroke="#2D3748"
        strokeWidth="3.91667"
        strokeLinecap="round"
      />
      <path
        d="M9.79167 24H43.0833"
        stroke="#2D3748"
        strokeWidth="3.91667"
        strokeLinecap="round"
      />
      <path
        d="M9.79167 33.7917H31.3333"
        stroke="#2D3748"
        strokeWidth="3.91667"
        strokeLinecap="round"
      />
    </Icon>
  );
}
