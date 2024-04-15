import { Container } from "@chakra-ui/layout";
import { Benefits } from "../components/homepage/Benefits";
import { JobOffer } from "../components/homepage/JobOffer";
import { JoinUpNow } from "../components/homepage/JoinUpNow";
import { Landing } from "../components/homepage/Landing";
import { Testimonial } from "../components/homepage/Testimonial";
import { FAQ } from "../components/homepage/FAQ";
import { FaHandSparkles } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { CalendarIcon } from "@chakra-ui/icons";
export function HomePage() {

	const benefits = [
		{
			heading: 'Our Ease of use',
			content: 'Our platform is designed to be as easy to use as possible and intuitive for new and old users.',
			icon: (
				<FaHandSparkles />
			)
		},
		{
			heading: 'Real-Time Data',
			content: 'Our platform provides real-time updates on stock performance and earnings summaries.',
			icon: (
				<CalendarIcon />
			)
		},
		{
			heading: 'Customer Support',
			content: 'Our team is available 24/7 to provide support and answer any questions you may have.',
			icon: (
				<MdSupportAgent />
			)
		}
	];

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

	const TestimonialProps = {
		quote:
			"As an avid investor, I've been continually impressed by this website's comprehensive and intuitive platform. It offers a real-time view of my investments, including detailed stock performance and earnings summaries. The dashboard is user-friendly, making it easy to track my financial growth and make informed decisions. This tool has not only simplified my investment tracking but also significantly boosted my confidence in managing my portfolio. I highly recommend InView to anyone serious about maximizing their investment potential.",
		avatarURL: "https://media.licdn.com/dms/image/D4D03AQGt8kXSUqmhBg/profile-displayphoto-shrink_800_800/0/1693219459486?e=2147483647&v=beta&t=kxpWDcTBCz-I9cqbe6yX9QMCQtZNAVqJu8lf3zFh__8",
		name: "Aakash Sethi",
		role: "Songwriter",
		company: "Spotify"
	}
	return (
		<Container maxW="container.xl" overflowY="hidden">
			<Landing />
			<Benefits benefits={benefits} />
			<Testimonial TestimonialProps={TestimonialProps} />
			<JobOffer />
			<JoinUpNow />
			<FAQ faqData={faqData} />
		</Container>
	);
}
