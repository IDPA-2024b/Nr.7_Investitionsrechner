import {
	chakra,
	Stack,
	HStack,
	Text,
	useColorModeValue,
	Box,
	Link,
	Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export function Landing() {
	const navigate = useNavigate();
	return (
		<>
			<Stack
				direction="column"
				spacing={6}
				justifyContent="center"
				maxW="480px"
				mx="auto"
				pt={"100px"}
			>
				<chakra.h1
					fontSize="5xl"
					lineHeight={1}
					fontWeight="bold"
					textAlign="center"
				>
					Made broad investing easy <br />
					<chakra.span color="teal.600">With InView</chakra.span>
				</chakra.h1>
				<Text
					fontSize="1.2rem"
					lineHeight="1.375"
					fontWeight="400"
					textAlign="center"
					color="smalltext.base"
				>
					With InView you can easily track your investment journey. Now All of
					your Invetsing is Centralised in one place.
				</Text>
				<HStack
					spacing={{ base: 0, sm: 2 }}
					mb={{ base: "3rem !important", sm: 0 }}
					flexWrap="wrap"
					justifyContent="center"
				>
					<Button
						w={{ base: "100%", sm: "auto" }}
						h={12}
						px={6}
						mb={{ base: 2, sm: 0 }}
						zIndex={1}
						lineHeight={1}
						_hover={{
							opacity: 0.9,
							transform: "scale(1.05)",
							transition: "transform 0.3s ease-in-out, color 0.3s ease",
						}}
						colorScheme="teal"
						onClick={() => navigate("/login")}
					>
						Sign up for free
					</Button>
					<Box
						display="flex"
						justifyContent="center"
						bg={useColorModeValue("white", "gray.800")}
						w={{ base: "100%", sm: "auto" }}
						border="1px solid"
						borderColor="gray.300"
						p={3}
						lineHeight={1.18}
						rounded="md"
						boxShadow="md"
						as={Link}
						zIndex={1}
						_hover={{
							textDecoration: "none",
							transform: "scale(1.05)",
							transition: "transform 0.3s ease-in-out, color 0.3s ease",
						}}
						onClick={() => navigate("/pricing")}
					>
						See Pricing
					</Box>
				</HStack>
			</Stack>
			<Box
				width={"100vw"}
				zIndex={-1}
				position="absolute"
				top={0}
				left={0}
				right={0}
				height={"300px"}
				overflow="hidden"
				bgColor={"teal.200"}
			/>

			<Box
				width={"100%"}
				top={"290px"}
				zIndex={-1}
				position="absolute"
				left={0}
				right={0}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<title>{/*TODO: Add a title to the svg*/}</title>
					<defs>
						<linearGradient id="gradient" gradientTransform="rotate(90)">
							<stop offset="0%" stopColor="#81E6D9" />
							<stop offset="100%" stopColor="#E6FFFA" />
						</linearGradient>
					</defs>
					<path
						fill="url(#gradient)"
						fillOpacity="1"
						d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,64C840,85,960,139,1080,154.7C1200,171,1320,149,1380,138.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
					/>
				</svg>
			</Box>
		</>
	);
}
