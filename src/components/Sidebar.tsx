import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import investments from "../MockData/InvestmentData.json";
import { MdAttachMoney } from "react-icons/md";
interface SidebarProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function Sidebar({
  isOpen,
  onOpen = () => { },
  onClose = () => { },
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


  console.log(investments);
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
        <>
          {investments.map((investment) => (
            <Link key={investment.id} to={`investment/${investment.id}`} style={{ width: "100%" }}>
              <Flex align="center"
                textAlign={isOpen ? "left" : "center"}
                display={isOpen ? "flex" : "block"}
              >
                <Icon
                  as={MdAttachMoney}
                  boxSize={7}
                  p={1}
                  bg={"gray.200"} // Apply grey background when the sidebar is closed
                  borderRadius="5px" // Make the background circular
                />
                                {isOpen && <Text ml={2}>{investment.name}</Text>} {/* Conditionally render the text only when the sidebar is open */}
              </Flex>
            </Link>
          ))}
        </>
      </VStack>

    </chakra.aside>
  );
}
