// PopOverSell.js

import { Button, Text, ButtonGroup, FormControl, FormLabel, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, useDisclosure } from "@chakra-ui/react";
import React, { useRef } from "react";

export function PopOverSell({ pricePerUnit, units, saleDate, setPricePerUnit, setUnits, setSaleDate, onSell }) {
  const firstFieldRef = useRef(null);
  const { onOpen, onClose, isOpen } = useDisclosure()

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='auto'
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
            onSell={onSell}

          />
        </PopoverContent>
      </Popover>
    </>
  );
}
// Form.js



const Form = ({ firstFieldRef, pricePerUnit, units, saleDate, setPricePerUnit, setUnits, setSaleDate, onClose, onSell }) => {
  const handlePriceChange = (e) => {
    setPricePerUnit(e.target.value);
  };

  const handleUnitsChange = (e) => {
    setUnits(e.target.value);
  };

  const handleSaleDateChange = (e) => {
    setSaleDate(e.target.value);
  };

  return (
    <Stack spacing={4}>
      <Text>Sell Your Investment Now</Text>
      <FormControl>
        <FormLabel htmlFor="price-per-unit">Price Per Unit</FormLabel>
        <Input ref={firstFieldRef} id="price-per-unit" value={pricePerUnit} onChange={handlePriceChange} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="units">Units</FormLabel>
        <Input id="units" value={units} onChange={handleUnitsChange} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="saleDate">Sale Date</FormLabel>
        <Input id="saleDate" value={saleDate} onChange={handleSaleDateChange} />
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
