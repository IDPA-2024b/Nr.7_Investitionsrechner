import { SimpleGrid, Tooltip, chakra } from "@chakra-ui/react";
import { InvestmentType } from "../../types/investment";
import { NewInvestmentTypeButton } from "./TypeButton";

const availableTypes = Object.values(InvestmentType).filter(
  (type) => type !== InvestmentType.Other
);

interface TypeFormProps {
  selectedType: InvestmentType | null;
  setSelectedType: (type: InvestmentType) => void;
}

export function InvestmentTypeForm({
  selectedType,
  setSelectedType,
}: TypeFormProps) {
  return (
    <SimpleGrid width={"100%"} gap={"inherit"} columns={{ base: 2, md: 3 }}>
      {Object.values(availableTypes).map((type) => (
        <NewInvestmentTypeButton
          key={type}
          type={type}
          onClick={setSelectedType}
          isSelected={selectedType === type}
        />
      ))}
      <Tooltip
        width={"100%"}
        label={"Coming soon!"}
        aria-label={"Coming soon!"}
        placement="top"
      >
        <chakra.div width={"100%"}>
          <NewInvestmentTypeButton
            width={"100%"}
            type={InvestmentType.Other}
            onClick={setSelectedType}
            isSelected={selectedType === InvestmentType.Other}
            isDisabled
          />
        </chakra.div>
      </Tooltip>
    </SimpleGrid>
  );
}
