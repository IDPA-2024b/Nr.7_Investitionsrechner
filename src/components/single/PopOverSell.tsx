import {
  Button,
  Text,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

export function PopOverSell({
  pricePerUnit,
  units,
  saleDate,
  setPricePerUnit,
  setUnits,
  setSaleDate,
  onSell,
}) {
  const firstFieldRef = useRef(null);
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="top"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Button colorScheme="teal">Sell</Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Form
            firstFieldRef={firstFieldRef}
            pricePerUnit={pricePerUnit}
            units={units}
            saleDate={saleDate}
            setPricePerUnit={setPricePerUnit}
            setUnits={setUnits}
            setSaleDate={setSaleDate}
            onClose={onClose}
            onSell={() => {
              onSell();
              onClose();
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
// Form.js

const Form = ({
  firstFieldRef,
  pricePerUnit,
  units,
  saleDate,
  setPricePerUnit,
  setUnits,
  setSaleDate,
  onClose,
  onSell,
}) => {
  const handlePriceChange = (e) => {
    setPricePerUnit(e.target.value);
  };

  const handleUnitsChange = (e) => {
    setUnits(e.target.value);
  };

  return (
    <Stack spacing={4}>
      <Text>Sell Your Investment Now</Text>
      <FormControl>
        <FormLabel htmlFor="price-per-unit">Price Per Unit</FormLabel>
        <Input
          ref={firstFieldRef}
          id="price-per-unit"
          value={pricePerUnit}
          onChange={handlePriceChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="units">Units</FormLabel>
        <Input id="units" value={units} onChange={handleUnitsChange} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="saleDate">Sale Date</FormLabel>
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
          date={saleDate}
          onDateChange={(d) => setSaleDate(d)}
        />
      </FormControl>
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={onSell}>
          Sell Now
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
