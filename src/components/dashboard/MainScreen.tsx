import {
    Flex,
    Text
} from "@chakra-ui/react";
import { MainLineChart } from './MainLineChart';
import { MainInfoSection } from './MainInfoSection';
export function MainScreen({ investments }) {

    function sumTotalForMonth(dataSets) {
        const totalForMonth = {};

        // Calculate total price for each date
        dataSets.forEach((dataSet) => {
            dataSet.historicalData.forEach((dataPoint) => {
                const date = dataPoint.date;
                const value = dataPoint.pricePerUnit;

                if (!totalForMonth[date]) {
                    totalForMonth[date] = 0;
                }

                totalForMonth[date] += value;
            });
        });

        const result = Object.entries(totalForMonth).map(([date, value]) => ({
            date,
            value: parseFloat(value.toFixed(2)) // Round to two decimal places
        }));

        return result;
    }   


    const processedDataSets = sumTotalForMonth(investments);
    return (
        <>
        
            <Flex
                width={'90%'}
                minH={'90vh'}
                backgroundColor={'#edf2f7'}
                ml={"10%"}
                mt={"8vh"}
                borderRadius="30px 0 0 0"
                outline={' 1px solid #e2e8f0'}
                px={10}
                gap={4}
                flexDir={"column"}

            >
                <Text
                    py={10}
                    fontSize={'3xl'}
                    fontWeight={'bold'}
                    color={'#2d3748'}
                >
                    Dashboard
                </Text>
                <MainLineChart LastInvestmentData={processedDataSets} investments={investments} />
                <MainInfoSection  investments={investments} />
            </Flex>

        </>
    )
}
