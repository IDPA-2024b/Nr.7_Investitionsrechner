import { Container } from "@chakra-ui/layout";
import { Benefits } from "../components/homepage/Benefits";
import { JobOffer } from "../components/homepage/JobOffer";
import { JoinUpNow } from "../components/homepage/JoinUpNow";
import { Landing } from "../components/homepage/Landing";
import { SleekDesign } from "../components/homepage/SleekDesign";
import { Testimonial } from "../components/homepage/Testimonial";
import { FAQ } from "../components/homepage/FAQ";

export function HomePage() {
	
	const benefits = [
		{
			id: 1,
			title: "Benefit 1",
			text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, qui?",
			icon: "benefit-icon",
		},
		{
			id: 2,
			title: "Benefit 2",
			text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, qui?",
			icon: "benefit-icon",
		},
		{
			id: 3,
			title: "Benefit 3",
			text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, qui?",
			icon: "benefit-icon",
		},
	]
	const faqData = [
		{
			question: "What is fortnite?",
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
	]
	const SleekDesignProps = {
		title: "About Sleek Design",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
		splineURL: "https://prod.spline.design/4ufZdjS0fOS9-ObS/scene.splinecode",
	}
	const TestimonialProps = {
		quote:
			"Fortnite sit amet consectetur adipisicing elit. Explicabo cupiditate repellat unde voluptas, adipisci ex deleniti quisquam iusto voluptate nostrum. Dolore, impedit! Officia voluptates a obcaecati qui fuga consectetur similique in enim. Nisi laborum nulla recusandae odit possimus earum odio.",
		avatarURL: "https://media.licdn.com/dms/image/D4D03AQGt8kXSUqmhBg/profile-displayphoto-shrink_800_800/0/1693219459486?e=2147483647&v=beta&t=kxpWDcTBCz-I9cqbe6yX9QMCQtZNAVqJu8lf3zFh__8",
		name: "Aakash Sethi",
		role: "Songwriter",
		company: "Spotify"
	}
	return (
		<Container maxW="container.xl" overflowY="hidden">
			<Landing />
			<Benefits benefits={benefits} />
			<SleekDesign SleekDesignProps={SleekDesignProps}/>
			<Testimonial TestimonialProps={TestimonialProps}/>
			<JobOffer />
			<JoinUpNow />
			<FAQ faqData={faqData}/>
		</Container>
	);
}
