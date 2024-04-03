import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Input,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function Sidebar({
  isOpen,
  onOpen = () => {},
  onClose = () => {},
}: SidebarProps) {
  const navigate = useNavigate();
  const searchbarRef = useRef<HTMLInputElement>(null);
  const [openSearchClicked, setOpenSearchClicked] = useState(false);

  function handleOpenSearchBar() {
    onOpen();
    setOpenSearchClicked(true);
  }

  function handleNewInvestment() {
    onClose();
    navigate("/dashboard/new");
  }

  useEffect(() => {
    if (isOpen && openSearchClicked) {
      searchbarRef.current?.focus();
      setOpenSearchClicked(false);
    }
  }, [isOpen]);

  return (
    <chakra.aside>
      <VStack spacing={4} py="3" px="5">
        <Button
          colorScheme="teal"
          gap={"2"}
          width={isOpen ? "100%" : "initial"}
          onClick={handleNewInvestment}
        >
          <Text marginTop={"-0.2em"} fontWeight={"bold"}>
            +
          </Text>
          {isOpen && "New Investment"}
        </Button>

        <Input
          ref={searchbarRef}
          display={isOpen ? "block" : "none"}
          placeholder="Search"
        />
        <IconButton
          display={isOpen ? "none" : "block"}
          aria-label="search"
          icon={<SearchIcon />}
          onClick={handleOpenSearchBar}
        />
      </VStack>
    </chakra.aside>
  );
}
