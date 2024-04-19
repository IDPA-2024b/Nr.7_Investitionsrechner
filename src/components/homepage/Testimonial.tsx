import {
	Container,
	Text,
	VStack,
	Box,
	Avatar,
	Icon,
	useColorModeValue,
} from "@chakra-ui/react";
import { FaQuoteRight } from "react-icons/fa";
import "./style.css";

interface TestimonialProps {
	quote: string;
	avatarURL: string;
	name: string;
	role: string;
	company: string;
}

export function Testimonial({ TestimonialProps }: { TestimonialProps: TestimonialProps }) {
	return (
		<Container maxW="2xl" p={5} position="relative">
			<VStack spacing={3} position="relative" zIndex={1}>
				<Icon
					as={FaQuoteRight}
					w={8}
					h={8}
					color={useColorModeValue("teal.400", "teal.200")}
					_hover={{
						opacity: 0.9,
						transform: "scale(1.1)",
						transition: "transform 0.3s ease-in-out, color 0.3s ease",
					}}
				/>
				<Text p={5} color={useColorModeValue("gray.600", "gray.300")}>
					{TestimonialProps.quote}
				</Text>	
				<VStack alignItems="center">
					<Avatar
						name="avatar"
						_hover={{ animation: "spin 10s linear infinite" }}
						src={TestimonialProps.avatarURL}
						size="lg"
					/>
					<Box textAlign="center">
						<Text
							fontWeight="bold"
							fontSize="lg"
							_hover={{ animation: "none" }}
						>
							{TestimonialProps.name}
						</Text>
						<Text fontSize="md" color="gray.500">
							{TestimonialProps.role} at {TestimonialProps.company}
						</Text>
					</Box>
				</VStack>
			</VStack>
			<DottedBox />
		</Container>
	);
}
// fancy dotted box for the testimonial background from template kart
function DottedBox() {
	return (
		<Box
			position="absolute"
			top={0}
			left={0}
			height="full"
			maxW="700px"
			zIndex={0}
		>
			<Box>
				<svg width="350" height="250" fill="none">
					<title>{/*TODO: Add a title to the svg*/}</title>
					<defs>
						<pattern
							id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<rect
								x="0"
								y="0"
								width="4"
								height="4"
								fill="teal"
								opacity="0.2"
							/>
						</pattern>
					</defs>
					<rect
						width="404"
						height="404"
						fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
					/>
				</svg>
			</Box>
		</Box>
	);
}
