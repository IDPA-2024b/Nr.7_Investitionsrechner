import {
  Button,
  Container,
  HStack,
  Heading,
  Stepper,
  VStack,
  useSteps,
  Step,
  Box,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  useBreakpointValue,
  Flex,
  CircularProgress,
  Center,
  useToast,
} from "@chakra-ui/react";
import { BackToDashboard } from "../components/BackToDashboard";
import type { InvestmentType } from "../types/investment";
import { useEffect, useRef, useState } from "react";
import { InvestmentTypeForm } from "../components/newInvestment/TypeForm";
import { DetailsForm } from "../components/newInvestment/DetailsForm";
import { useNavigate } from "react-router-dom";
import { useInvestments } from "../hooks/contexts";

export function NewInvestmentPage() {
  const topRef = useRef<HTMLDivElement>(null);
  const [selectedInvestmentType, setSelectedInvestmentType] =
    useState<InvestmentType | null>(null);
  const [ticker, setTicker] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [units, setUnits] = useState<number>(0);
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { create } = useInvestments();
  const toast = useToast();
  const isLargeScreen =
    useBreakpointValue(
      { base: false, md: true },
      {
        ssr: false,
      }
    ) ?? false;

  const steps = [
    {
      label: "Type",
      component: (
        <InvestmentTypeForm
          selectedType={selectedInvestmentType}
          setSelectedType={setSelectedInvestmentType}
        />
      ),
      canContinue: selectedInvestmentType !== null,
    },
    {
      label: "Details",
      component: (
        <DetailsForm
          type={selectedInvestmentType}
          onTickerChange={setTicker}
          onNameChange={setName}
          onUnitsChange={(unit) => setUnits(unit)}
          onPurchasePriceChange={setPurchasePrice}
          onDateChange={setDate}
        />
      ),
      canContinue:
        ticker !== "" &&
        name !== "" &&
        units > 0 &&
        purchasePrice > 0 &&
        date !== "",
    },
    {
      label: "Review",
      component: (
        <Center width={"100%"}>
          <CircularProgress isIndeterminate color="teal.400" />
        </Center>
      ),
      canContinue: true,
      action: async () => {
        setLoading(true);
        try {
          await create({
            type: selectedInvestmentType!,
            symbol: ticker,
            name,
            purchase: {
              units,
              pricePerUnit: purchasePrice,
              date,
            },
          });
          toast({
            title: "Investment created",
            status: "success",
          });
          navigate("/dashboard");
        } catch (error) {
          toast({
            title: "Failed to create investment",
            status: "error",
          });
          setActiveStep(1);
        } finally {
          setLoading(false);
        }
      },
    },
  ];

  const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  useEffect(() => {
    topRef.current?.scrollIntoView({
      behavior: "smooth",
    });

    steps[activeStep].action?.();
  }, [activeStep]);

  return (
    <Container ref={topRef} maxWidth={"5xl"}>
      <VStack align={"start"} gap={8} minH={"100vh"}>
        <VStack align={"inherit"}>
          <BackToDashboard />
          <Heading size={"lg"}>New Investment</Heading>
        </VStack>
        {steps[activeStep].component}
      </VStack>
      {/* Stepper */}
      <HStack bg={"white"} padding={3} position={"sticky"} inset={0}>
        <Button
          size={{ base: "sm", md: "md" }}
          isDisabled={activeStep === 0 || loading}
          onClick={goToPrevious}
        >
          Back
        </Button>
        <Flex
          paddingX={"inherit"}
          justify={"center"}
          width={"100%"}
          flexGrow={1}
        >
          <Stepper
            colorScheme="teal"
            justifyContent={"center"}
            index={activeStep}
            flexGrow={{ base: 0, md: 1 }}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                {isLargeScreen && (
                  <Box flexShrink="0">
                    <StepTitle>{step.label}</StepTitle>
                  </Box>
                )}
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Flex>
        <Button
          size={{ base: "sm", md: "md" }}
          isDisabled={
            !steps[activeStep].canContinue || activeStep === 2 || loading
          }
          onClick={goToNext}
          value={1}
        >
          Next
        </Button>
      </HStack>
    </Container>
  );
}
