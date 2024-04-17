import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Text,
    Flex,
    Heading,
    Box,
    Container,
    useBreakpointValue,
} from '@chakra-ui/react';
export function Contact() {
    const formRef = useRef();
    const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        topic: '',
        message: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current, 
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
                (result) => {
                    formRef.current.reset();
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };




    return (
        <>
            <Container
                maxW={"container.lg"}
                mt={"50px"}
            >

                <Flex
                    direction={flexDirection}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box width="50%">
                        <Heading>
                            Contact us if you have any questions!
                        </Heading>
                        <Box>
                            <hr style={{ width: "50%", backgroundColor: "teal", height: "4px", border: "none", marginTop: "20px" }} />
                        </Box>
                        <Text maxW={"90%"}>
                            Send us a message and we will get back to you as soon as possible 💯💯💯.
                        </Text>
                        <Box fontStyle={"italic"} mt={"30px"} display={useBreakpointValue({ base: 'none', md: 'block' })}>
                            <Text>
                                InView CH
                            </Text>
                            <Text>
                                Rosenstrasse 1
                            </Text>
                            <Text>
                                8400 Winterthur
                            </Text>
                            <Text
                                textDecor={"underline"}
                            >
                                <a href="mailto:idpa.investment.dashboard@gmail.com">idpa.investment.dashboard@gmail.com</a>
                            </Text>
                        </Box>

                    </Box>
                    <form ref={formRef} onSubmit={sendEmail} style={{ width: "50%" }}>
                        <FormControl marginBottom="1rem">
                            <FormLabel>Name</FormLabel>
                            <Input
                                focusBorderColor='teal.400'
                                type="text"
                                name="from_name"
                                required
                                placeholder="John Doe"
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl marginBottom="1rem">
                            <FormLabel>Email</FormLabel>
                            <Input
                                focusBorderColor='teal.400'
                                type="email"
                                name="from_email"
                                required
                                placeholder="John@Doe.com"
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl marginBottom="1rem">
                            <FormLabel htmlFor="topic">Topic</FormLabel>
                            <Input
                                focusBorderColor='teal.400'
                                type="text"
                                name="topic"
                                required
                                placeholder="Collaboration"
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl marginBottom="1rem">
                            <FormLabel>Message</FormLabel>
                            <Textarea
                                focusBorderColor='teal.400'
                                name="message"
                                required
                                placeholder="I would like to..."
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <Button type="submit" colorScheme="teal" width={"100%"}>
                            Send
                        </Button>
                    </form>

                    <Box fontStyle={"italic"} mt={"30px"} display={useBreakpointValue({ base: 'block', md: 'none' })}>
                        <Text>
                            InView CH
                        </Text>
                        <Text>
                            Rosenstrasse 1
                        </Text>
                        <Text>
                            8400 Winterthur
                        </Text>
                        <Text
                            textDecor={"underline"}
                        >
                            <a href="mailto:idpa.investment.dashboard@gmail.com">idpa.investment.dashboard@gmail.com</a>
                        </Text>
                    </Box>

                </Flex>
            </Container>
        </>
    )
}