import {
	Box,
	Text,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from "@chakra-ui/react";

const faqData = [
	{
		question: "What is Lorem Ipsum?",
		answer:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
	},
	{
		question: "Why do we use it?",
		answer:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
	},
	{
		question: "Where does it come from?",
		answer:
			"Contrary to popular belief, Lorem Ipsum is not simply random text.",
	},
];

export function FAQ() {
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
