import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import investments from "../MockData/InvestmentData.json";
import { MdAttachMoney } from "react-icons/md";
import { FaBitcoin } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { FaHouse } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInvestments, setFilteredInvestments] = useState(investments);
  const [selectedType, setSelectedType] = useState("All");
  const types = [
    { name: "Stock", icon: <AiOutlineStock /> },
    { name: "Crypto", icon: <FaBitcoin /> },
    { name: "Property", icon: <FaHouse /> },
    { name: "Cars", icon: <FaCarSide /> },
    { name: "Others", icon: <HiOutlineDotsCircleHorizontal /> },
  ];
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

  useEffect(() => {
    const filteredByName = investments.filter(investment =>
      investment.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let filteredByType = [...filteredByName]; // Start with filteredByName as the base

    if (selectedType !== "All") {
      filteredByType = filteredByName.filter(investment => investment.type === selectedType);
    }

    setFilteredInvestments(filteredByType);
  }, [searchQuery, selectedType, investments]);

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

        <InputGroup display={isOpen ? "flex" : "none"}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            ref={searchbarRef}
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        {/* Filter Section */}


        <IconButton
          display={isOpen ? "none" : "block"}
          aria-label="search"
          icon={<SearchIcon />}
          onClick={handleOpenSearchBar}
        />
        {isOpen && (
          <FormControl>
            <Select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="All">All</option>
              {types.map((type) => (
                <option key={type} value={type.name}>
                  {type.icon} {type.name}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        {isOpen && (
          <chakra.div
            w="100%"
            h="1px"
            bg="gray.200"
            display={filteredInvestments.length > 0 ? "block" : "none"} // Show the line only if there are filtered investments
          />
        )}
        <>
          {filteredInvestments.map((investment) => (
            <Link key={investment.id} to={`investment/${investment.id}`} style={{ width: "100%" }}>
              <Flex align="center"
                textAlign={isOpen ? "left" : "center"}
                display={isOpen ? "flex" : "block"}
              >
                <Icon
                  as={investment.type === "Stock" ? AiOutlineStock : investment.type === "Crypto" ? FaBitcoin : investment.type === "Property" ? FaHouse : investment.type === "Cars" ? FaCarSide : HiOutlineDotsCircleHorizontal}
                  boxSize={7}
                  p={1}
                  bg={"gray.200"} // Apply grey background when the sidebar is closed
                  borderRadius="5px" // Make the background circular
                />
                {isOpen && <Text ml={2}>{investment.name}</Text>} {/* Conditionally render the text only when the sidebar is open */}
              </Flex>
              {isOpen && (
                <chakra.div
                  w="100%"
                  h="1px"
                  bg="gray.200"
                  mt={5}
                  display={filteredInvestments.length > 0 ? "block" : "none"} // Show the line only if there are filtered investments
                />
              )}
            </Link>
          ))}
        </>
      </VStack>

    </chakra.aside>
  );
}
