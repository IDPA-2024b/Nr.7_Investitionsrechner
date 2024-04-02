import { DateRange, LineChart } from "../charts/Line"
import { Box, Flex, Select, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import { TextWithTooltip } from "../TextWithTooltip"
import { theme } from './../../configs/chakra';
import { Investment } from './../../types/investment';
interface MainLineChartProps {
    LastInvestmentData: {
        date: string;
        value: number;
    }[],
    investments: {
        Investment: Investment
    }[]
}
export function MainLineChart({ LastInvestmentData, investments }: MainLineChartProps) {
    const [dateRange, setDateRange] = useState('last7days');
    const [firstValue, setFirstValue] = useState(0)
    const [lastValue, setLastValue] = useState(0)
    const [percentageGain, setPercentageGain] = useState(0)
    const [amountGain, setAmountGain] = useState(0)
    function receiveData(data1: number, data2: number) {
        setFirstValue(calculateAmountSpentInTimeRange(investments, dateRange as DateRange) || data1);
        setLastValue(data2);
    }

    function calculateAmountSpentInTimeRange(investments: Investment[], dateRange: DateRange) {

        const now = new Date();
        const date = new Date();
        switch (dateRange) {
            case DateRange.Last7Days:
                date.setDate(now.getDate() - 7);
                break;
            case DateRange.LastMonth:
                date.setMonth(now.getMonth() - 1);
                break;
            case DateRange.LastYear:
                date.setFullYear(date.getFullYear() - 1);
                date.setMonth(0);
                date.setDate(1);
                break;
            case DateRange.All:
                date.setFullYear(1970);
                break;
        }
        let totalPaied = 0
        console.log("date", date)
        const filteredInvestments = investments.filter((investment) => {
            const investmentDate = new Date(investment.purchase.date);
            if (investmentDate >= date) {
                totalPaied += investment.purchase.price * investment.purchase.amount;
            }
        });
        return totalPaied;
    }
    const tmp = calculateAmountSpentInTimeRange(investments, dateRange as DateRange)
    console.log("tmp", tmp)
    function calculatePercentageChange(firstValue: number, lastValue: number) {
        if (firstValue === 0) {
            return 0;
        }
        return parseFloat(((lastValue - firstValue) / firstValue * 100).toFixed(2));
    }
    useEffect(() => {
        setPercentageGain(calculatePercentageChange(firstValue, lastValue));
        setAmountGain(parseFloat((lastValue - firstValue).toFixed(2)));
    }, [firstValue, lastValue])

    return (
        <>
            <Box
                backgroundColor={'white'}
                p={8}
                borderRadius="30px"
                outline={' 1px solid #e2e8f0'}
                px={10}
                transition="all 0.3s ease"
            >
                <Flex
                    justifyContent={'space-between'}
                    mb={4}
                    flexWrap={'wrap'}
                    gap={4}
                >
                    <Flex
                        flexDir={'column'}
                        gap={4}
                    >
                        <Text
                            fontSize={"2rem"}
                            fontWeight={"bold"}
                        >
                            <TextWithTooltip name={'Current Market Value'} text="IDK PLEASE SNJ HELP 😭 I DONT KNOW THE VOCI" />
                        </Text>
                        <Text
                            fontWeight={"bold"}
                            fontSize={"2rem"}
                        >
                            ${lastValue.toLocaleString()}
                        </Text>
                        <Text
                            fontSize={"md"}
                            mt={-4}
                            color={percentageGain < 0 ? 'red.400' : 'green'}
                        >
                            {amountGain > 0 ? '+' : ''} ${amountGain.toLocaleString()} ({percentageGain.toLocaleString()}%) {percentageGain < 0 ? <TriangleDownIcon color={'red.400'} /> : <TriangleUpIcon color={'green'} />}

                        </Text>
                    </Flex>

                    <Select
                        maxW="300px"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        outlineColor={"teal"}
                        borderColor="transparent"
                        _hover={
                            {
                                borderColor: theme.colors.teal[500]
                            }
                        }
                        focusBorderColor={theme.colors.teal[500]}

                    >
                        <option value={DateRange.Last7Days}>Last 7 days</option>
                        <option value='lastMonth'>Last Month</option>
                        <option value='lastYear'>Last Year</option>
                        <option value='all'>All Time</option>
                    </Select>
                </Flex>
                <LineChart data={LastInvestmentData.map((v) => ({
                    date: v.date,
                    pricePerUnit: v.value
                }))}
                    dateRange={dateRange as DateRange}
                    receiveData={receiveData}
                />
            </Box>
        </>
    )
}