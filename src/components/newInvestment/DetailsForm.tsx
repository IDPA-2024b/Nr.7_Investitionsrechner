import {
  Input,
  NumberInput,
  NumberInputField,
  useOutsideClick,
  chakra,
  VStack,
  Divider,
  Button,
  Highlight,
  Text,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { type Lookup, lookupStocks } from "../../apis/finnhub";
import { InvestmentType } from "../../types/investment";
import { Form } from "../Form";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { format } from "date-fns";

interface DetailsFormProps {
  type: InvestmentType | null;
  onTickerChange: (ticker: string) => void;
  onNameChange: (name: string) => void;
  onUnitsChange: (units: number) => void;
  onPurchasePriceChange: (purchasePrice: number) => void;
  onDateChange: (date: string) => void;
}

export function DetailsForm({
  type,
  onTickerChange,
  onNameChange,
  onUnitsChange,
  onPurchasePriceChange,
  onDateChange,
}: DetailsFormProps) {
  const [_, setTicker] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [units, setUnits] = useState<number>(0);
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());

  function handleTickerSelect(suggestion: Lookup) {
    setTicker(suggestion.symbol);
    onTickerChange(suggestion.symbol);
    if (suggestion.name && suggestion.name.length > 0) {
      setName(suggestion.name);
      onNameChange(suggestion.name);
    }
  }

  return (
    <>
      <Form
        label={"Ticker Symbol"}
        helperText={
          type === InvestmentType.Stock
            ? "Start typing to get suggestions..."
            : "Enter the ticker symbol for this investment."
        }
        isRequired
      >
        <QueryableInput
          onSelect={handleTickerSelect}
          getSuggestions={
            type === InvestmentType.Stock ? lookupStocks : undefined
          }
        />
      </Form>
      <Form
        label={"Name"}
        helperText={"Enter a name for this investment."}
        isRequired
      >
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            onNameChange(e.target.value);
          }}
          bg={"white"}
          placeholder={"My Investment"}
        />
      </Form>
      <Form
        label="Units"
        helperText="Enter the number of units you own."
        isRequired
      >
        <NumberInput bg={"white"}>
          <NumberInputField
            value={units}
            onChange={(e) => {
              setUnits(Number.parseFloat(e.target.value));
              onUnitsChange(Number.parseFloat(e.target.value));
            }}
            placeholder="1.25"
          />
        </NumberInput>
      </Form>
      <Form
        label="Purchase Price"
        helperText="Enter the purchase price per unit."
        isRequired
      >
        <NumberInput bg={"white"}>
          <NumberInputField
            value={purchasePrice === 0 ? undefined : purchasePrice}
            onChange={(e) => {
              setPurchasePrice(Number.parseFloat(e.target.value));
              onPurchasePriceChange(Number.parseFloat(e.target.value));
            }}
            placeholder="250"
          />
        </NumberInput>
      </Form>
      <Form
        label="Date of Purchase"
        helperText="Enter the date of purchase."
        isRequired
      >
        <SingleDatepicker
          triggerVariant="input"
          maxDate={new Date()}
          propsConfigs={{
            inputProps: {
              width: "100%",
              bg: "white",
              isRequired: true,
            },
            dayOfMonthBtnProps: {
              defaultBtnProps: {
                _hover: {
                  bg: "teal.100",
                },
              },
              selectedBtnProps: {
                bg: "teal.400",
                color: "white",
              },
            },
          }}
          date={date}
          onDateChange={(d) => {
            setDate(d);
            onDateChange(format(d, "MM-dd-yyyy"));
          }}
        />
      </Form>
    </>
  );
}

interface QueryableInputProps {
  getSuggestions?: (query: string) => Promise<Lookup[]>;
  onSelect: (suggestion: Lookup) => void;
}

export function QueryableInput({
  getSuggestions,
  onSelect,
}: QueryableInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Lookup[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  useOutsideClick({
    ref: containerRef,
    handler: () => {
      if (query.length > 1) {
        onSelect({ symbol: query, name: "" });
      }
      setShowSuggestions(false);
    },
    enabled: true,
  });

  async function onChange(newVal: string) {
    setQuery(newVal);
    onSelect({ symbol: newVal, name: "" });
    if (newVal.length < 1) {
      setSuggestions([]);
      return;
    }
    if (getSuggestions) {
      setSuggestions(await getSuggestions(newVal));
    }
  }

  function handleSuggestionClick(suggestion: Lookup) {
    setQuery(suggestion.symbol);
    setSuggestions([]);
    setShowSuggestions(false);
    onSelect(suggestion);
  }

  return (
    <chakra.div
      padding={suggestions.length > 0 ? 2 : 0}
      rounded={"md"}
      ref={containerRef}
      bg={"white"}
    >
      <Input
        onFocus={() => setShowSuggestions(true)}
        ref={inputRef}
        value={query}
        onChange={(e) => onChange(e.target.value)}
        bg={"white"}
        placeholder={"AAPL"}
        marginBottom={suggestions.length > 0 ? 2 : 0}
      />
      <VStack align={"start"} width={"100%"} overflow={"hidden"}>
        {suggestions.length > 0 && <Divider />}
        {showSuggestions &&
          suggestions.map((suggestion) => (
            <Button
              _hover={{
                overflow: "visible",
              }}
              key={suggestion.symbol}
              onClick={() => handleSuggestionClick(suggestion)}
              width={"100%"}
              justifyContent={"start"}
            >
              <Text
                overflow={"hidden"}
                whiteSpace={"nowrap"}
                textOverflow={"ellipsis"}
              >
                {suggestion.name}
                <chakra.span marginLeft={3} color={"gray.400"}>
                  <Highlight
                    query={query}
                    styles={{
                      color: "teal.400",
                    }}
                  >
                    {suggestion.symbol}
                  </Highlight>
                </chakra.span>
              </Text>
            </Button>
          ))}
      </VStack>
    </chakra.div>
  );
}
