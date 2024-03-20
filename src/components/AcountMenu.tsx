import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  Flex,
  IconButton,
  type ButtonProps,
  MenuItem,
  Avatar,
  Text,
} from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

interface AcountMenuProps {
  name?: string | null;
  src?: string | null;
  logout: () => void;
}

export function AcountMenu({ name, src, logout }: AcountMenuProps) {
  return (
    <Menu>
      {({ onClose }) => (
        <>
          <MenuButton
            _hover={{
              transform: "scale(1.5)",
            }}
            _active={{
              transform: "scale(1)",
            }}
          >
            <Avatar
              size={"sm"}
              src={src ?? undefined}
              name={name ?? undefined}
            />
          </MenuButton>
          <MenuList bg="gray.100" paddingX={2} paddingY={2}>
            <Flex justify={"space-between"} align={"center"} width={"100%"}>
              <Text color={"black"} fontWeight={"medium"}>
                {name}
              </Text>
              <IconButton
                onClick={onClose}
                variant={"ghost"}
                color={"black"}
                _hover={{ bg: "transparent", transform: "scale(1.5)" }}
                aria-label="Schließen"
                icon={<SmallCloseIcon />}
              />
            </Flex>
            <AvatarMenuIcon onClick={logout}>
              <Text>Logout</Text>
            </AvatarMenuIcon>
          </MenuList>
        </>
      )}
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
