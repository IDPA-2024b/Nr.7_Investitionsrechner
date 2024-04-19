import {
  type ButtonProps,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { KebabIcon } from "../KebabIcon";
import type { PropsWithChildren } from "react";

interface OptionsMenuProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

export function OptionsMenu({ onDelete, onUpdate }: OptionsMenuProps) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        color="black"
        aria-label="Options"
        icon={<KebabIcon boxSize={6} />}
      >
        Actions
      </MenuButton>
      <MenuList bg="gray.100" paddingX={2} paddingY={2}>
        <AvatarMenuIcon isDisabled onClick={onUpdate}>
          <Tooltip label="Coming soon!" hasArrow>
            <Text>Update</Text>
          </Tooltip>
        </AvatarMenuIcon>
        <AvatarMenuIcon onClick={onDelete}>
          <Text>Delete</Text>
        </AvatarMenuIcon>
      </MenuList>
    </Menu>
  );
}

function AvatarMenuIcon({
  onClick,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <MenuItem
      paddingY={3}
      marginBottom={1}
      _first={{ roundedTop: "md" }}
      _last={{ roundedBottom: "md" }}
      _hover={{ bg: "gray.200" }}
      onFocus={(e) => e.target.blur()}
      {...rest}
      onClick={onClick}
    >
      {children}
    </MenuItem>
  );
}
