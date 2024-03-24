import { useState } from 'react';
import { Box, Button, Text, Image } from '@chakra-ui/react';
import blob from '../assets/SVGs/Blob.svg';
import waves from '../assets/SVGs/layered-waves-haikei.svg'
import "./style.css";
export function JoinUpNow() {

    return (
        <>
            <Box
                bgGradient="linear(to-r, teal.200, teal.300)"
                padding="2rem"
                borderRadius={10}
                my="100px"
                position="relative"
                overflow="hidden"
            >
                <Image
                    src={blob}
                    alt="Blob SVG"
                    
                    style={{
                        position: 'absolute',
                        top: '0%',
                        left: '-50%',
                        transform: `translate(-60%, -50%) rotate(0deg)`,
                        transition: 'opacity 0.3s ease, transform 0.5s linear',
                        zIndex: 1,
                    }}
                    className="spin-animation" 
                />
                <Image
                    src={waves}
                    alt="Waves SVG"
                    style={{
                        position: 'absolute',
                        top: '0',
                        right: '-30%',
                        transform: `translate(0%, 0%) rotate(225deg)`,
                        transition: 'opacity 0.3s ease, transform 0.5s linear',
                        zIndex: 0,
                    }}
                />
                <Box
                    zIndex={3}
                    position="relative"
                    animation="spin 2s linear infinite"
                    as="span"


                >
                    <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">Scrolled this Far And still not have a account?</Text>
                    <Text fontSize="lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                    </Text>
                    <Button
                        colorScheme="teal"
                        size="lg"
                        marginTop="1rem"
                    >
                        Join Now
                    </Button>
                </Box>
            </Box>
        </>
    );
}
