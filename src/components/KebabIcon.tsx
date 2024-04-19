import { Icon, type IconProps } from "@chakra-ui/react";

export function KebabIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </Icon>
  );
}
