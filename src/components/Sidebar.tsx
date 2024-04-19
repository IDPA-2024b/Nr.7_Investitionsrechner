import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Highlight,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  VStack,
  chakra,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  const searchbarRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { investments } = useInvestments();
  const [openSearchClicked, setOpenSearchClicked] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [filteredInvestments, setFilteredInvestments] = useState(investments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>();

  function handleOpenSearchBar() {
    onOpen();
    setOpenSearchClicked(true);
  }

  function handleNewInvestment() {
    onClose();
    navigate("/dashboard/new");
  }

  function handleInvestmentClick(id: string) {
    setSelectedInvestment(id);
    if (isMobile) onClose();
    navigate(`/dashboard/investment/${id}`);
  }

  function filterByQuery(investment: Investment): boolean {
    return investment.name.toLowerCase().includes(searchQuery.toLowerCase());
  }

  function filterByType(investment: Investment): boolean {
    if (selectedType === "all") return true;
    return investment.type === selectedType;
  }

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setSelectedInvestment(null);
    }
  }, [location]);

  useEffect(() => {
    setFilteredInvestments(
      investments.filter(filterByQuery).filter(filterByType)
    );
  }, [investments, selectedType, searchQuery]);

  useEffect(() => {
    if (isOpen && openSearchClicked) {
      searchbarRef.current?.focus();
      setOpenSearchClicked(false);
    }
  }, [isOpen]);

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
        )}
        <VStack
          width={"100%"}
          align="start"
          spacing={2}
          display={isOpen ? "flex" : "none"}
        >
          {filteredInvestments.map((investment) => (
            <chakra.div
              _hover={{
                bg: "gray.100",
                borderTopRadius: "5px",
              }}
              bg={selectedInvestment === investment.id ? "gray.100" : "white"}
              key={investment.id}
              width="100%"
              onClick={() => handleInvestmentClick(investment.id)}
            >
              <Flex cursor={"pointer"} key={investment.id} paddingY={2} gap={3}>
                <InvestmentIcon
                  type={investment.type}
                  boxSize={7}
                  p={1}
                  // bg={"gray.200"}
                  borderRadius="5px"
                />
                <Text
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  <Highlight
                    styles={{ color: "teal.500", fontWeight: "bolder" }}
                    query={searchQuery}
                  >
                    {investment.name}
                  </Highlight>
                </Text>
              </Flex>
              <Divider borderColor={"gray.300"} />
            </chakra.div>
          ))}
        </VStack>
      </VStack>
    </chakra.aside>
  );
}
