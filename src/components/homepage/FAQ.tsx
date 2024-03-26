import {
	Box,
	Text,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from "@chakra-ui/react";



interface FAQData {
	question: string;
	answer: string;
}
export function FAQ({ faqData }: { faqData: FAQData[]}) {
	return (
		<Box m={10} my="100px" p={4}>
			<Text fontSize={50} fontWeight="100px">
				This is the FAQ
			</Text>
			<Accordion allowMultiple>
				{faqData.map((faq, index) => (
					<AccordionItem key={index}>
						<h2>
							<AccordionButton>
								<Box flex="1" textAlign="left">
									{faq.question}
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</Box>
	);
}
