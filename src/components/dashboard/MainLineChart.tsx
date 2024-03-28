import { DateRange, LineChart } from "../charts/Line"
import LastInvestmentData from "../../MockData/overalData.json"
import InvestmentPercentageData from "../../MockData/InvestedPercent.json"
import { Box, Select } from "@chakra-ui/react"
import { useState } from "react"
import { TextWithTooltip } from "../TextWithTooltip"
export function MainLineChart() {
    const [dateRange, setDateRange] = useState('last7days');

    return (
        <>
            <Box
                backgroundColor={'white'}
                p={8}
                borderRadius="30px"
                outline={' 1px solid #e2e8f0'}
                px={10}
            >
                <TextWithTooltip name={'Current Market Value'} text="IDK PLEASE SNJ HELP 😭 I DONT KNOW THE VOCI" />

                <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                    <option value={DateRange.Last7Days}>Last 7 days</option>
                    <option value='lastMonth'>Last Month</option>
                    <option value='lastYear'>Last Year</option>
                    <option value='all'>All Time</option>
                </Select>
                <LineChart data={LastInvestmentData.map((v) => ({
                    date: v.date,
                    pricePerUnit: v.value
                }))}
                    dateRange={dateRange as DateRange}
                />
            </Box>
        </>
    )
}