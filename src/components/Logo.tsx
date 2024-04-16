import { Flex, Heading, Image } from "@chakra-ui/react";
import LogoIcon from "../assets/InViewLogoIcon.svg";
import { useState } from "react";
import Sound from "../assets/Sound.mp3";

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick = () => { } }: LogoProps) {
  const [counter, setCounter] = useState(0);
  const [audio] = useState(new Audio(Sound));
  function ThemeSongHandle() {
    setCounter(counter + 1);
  }
  if (counter === 100) {
    audio.play();
    setCounter(0);
  }
  return (
    <Heading
      _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
      transition={"transform 0.2s ease-in-out"}
      onClick={onClick}
    >
      <Flex
        gap={2}
        alignItems="center"
      >

        <Image src={LogoIcon} alt="Logo" boxSize="30px" onClick={ThemeSongHandle}/>
        InView
      </Flex>
    </Heading>
  );
}
