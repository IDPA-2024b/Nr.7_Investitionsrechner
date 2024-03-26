import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import WeWantYou from "../assets/we-want-you-stellenanzeige.jpg";
export function JobOffer() {
	return (
		<Flex
			gap={10}
			padding="2rem"
			justifyContent="center"
			alignItems="center"
			flexDirection={{ base: "column", lg: "row" }}
			width="100%"
			height="100%"
			my="100px"
		>
			<Box width="50%">
				<Image
					src={WeWantYou}
					alt="Job Offer"
					width={"100%"}
					height={"100%"}
					objectFit="cover"
					borderRadius={{ base: "10px 10px 0 0", lg: "10px 0 0 10px" }}
				/>
			</Box>
			<Box width="50%">
				<Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">
					We are searching for New Team Members
				</Text>
				<Text fontSize="lg">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
					perspiciatis unde omnis iste natus error sit voluptatem accusantium
					doloremque laudantium.
				</Text>
				<Button
					colorScheme="teal"
					size="lg"
					marginTop="1rem"
					_hover={{
						opacity: 0.9,
						transform: "scale(1.05)",
						transition: "transform 0.3s ease-in-out, color 0.3s ease",
					}}
				>
					Apply Now
				</Button>
			</Box>
		</Flex>
	);
}
