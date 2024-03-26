import { Container } from "@chakra-ui/layout";
import { Benefits } from "../components/homepage/Benefits";
import { JobOffer } from "../components/homepage/JobOffer";
import { JoinUpNow } from "../components/homepage/JoinUpNow";
import { Landing } from "../components/homepage/Landing";
import { SleekDesign } from "../components/homepage/SleekDesign";
import { Testimonial } from "../components/homepage/Testimonial";
import { FAQ } from "../components/homepage/FAQ";

export function HomePage() {
	return (
		<Container maxW="container.xl" overflowY="hidden">
			<Landing />
			<Benefits />
			<SleekDesign />
			<Testimonial />
			<JobOffer />
			<JoinUpNow />
			<FAQ />
		</Container>
	);
}
