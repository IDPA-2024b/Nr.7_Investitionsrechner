import { Container } from "@chakra-ui/layout";
import { Benefits } from "../components/landing/Benefits";
import { JobOffer } from "../components/landing/JobOffer";
import { JoinUpNow } from "../components/landing/JoinUpNow";
import { Landing } from "../components/landing/Landing";
import { SleekDesign } from "../components/landing/SleekDesign";
import { Testimonial } from "../components/landing/Testimonial";
import { FAQ } from "../components/landing/FAQ";

export function StartPage() {
  return (
    <div>
      <Container maxW="container.xl" overflowY="hidden">

        <Landing />
        <Benefits />
        <SleekDesign />
        <Testimonial />
        <JobOffer />
        <JoinUpNow />
        <FAQ />
      </Container>
    </div>
  );
}
