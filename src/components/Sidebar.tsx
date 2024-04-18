import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
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
import { InvestmentIcon } from "./InvestmentIcon";
import { InvestmentType, type Investment } from "../types/investment";
import { useInvestments } from "../hooks/contexts";

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
  const {investments} = useInvestments();
  const navigate = useNavigate();
  const searchbarRef = useRef<HTMLInputElement>(null);
  const [openSearchClicked, setOpenSearchClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInvestments, setFilteredInvestments] = useState(
    investments as Investment[]
  );
  const [selectedType, setSelectedType] = useState("All");

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
    const filteredByName = (investments as Investment[]).filter((investment) =>
      investment.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let filteredByType = [...filteredByName];

    if (selectedType !== "all") {
      filteredByType = filteredByName.filter(
        (investment) => investment.type === selectedType
      );
    }

    setFilteredInvestments(filteredByType);
  }, [searchQuery, selectedType, investments]);

  return (
    <chakra.aside overflow={"auto"}>
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

        <IconButton
          display={isOpen ? "none" : "block"}
          aria-label="search"
          icon={<SearchIcon />}
          onClick={handleOpenSearchBar}
        />
        {isOpen && (
          <FormControl>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All</option>
              {Object.entries(InvestmentType).map(([key, value]) => (
                <chakra.option key={key} value={value}>
                  {key}
                </chakra.option>
              ))}
            </Select>
          </FormControl>
        )}
        {isOpen && (
          <chakra.div
            w="100%"
            h="1px"
            bg="gray.200"
            display={filteredInvestments.length > 0 ? "block" : "none"}
          />
        )}
        {isOpen && (
          <>
            {filteredInvestments.map((investment) => (
              <Link
                key={investment.id}
                to={`investment/${investment.id}`}
                style={{ width: "100%" }}
              >
                <Flex
                  align="center"
                  textAlign={isOpen ? "left" : "center"}
                  display={isOpen ? "flex" : "block"}
                >
                  <InvestmentIcon
                    type={investment.type}
                    boxSize={7}
                    p={1}
                    bg={"gray.200"}
                    borderRadius="5px"
                  />
                  <Text ml={2}>{investment.name}</Text>
                </Flex>
                <chakra.div
                  w="100%"
                  h="1px"
                  bg="gray.200"
                  mt={5}
                  display={filteredInvestments.length > 0 ? "block" : "none"}
                />
              </Link>
            ))}
          </>
        )}
      </VStack>
    </chakra.aside>
  );
}
