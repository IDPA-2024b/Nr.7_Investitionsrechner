import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export function PopOverUnsell({ unSell, onCancel }) {
    const { onOpen, onClose, isOpen } = useDisclosure()

    return (
        <>
            <Popover
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                placement='auto'
                closeOnBlur={true}
            >
                <PopoverTrigger>
                    <Button colorScheme='teal'>UnSell</Button>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Are you Sure ?</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                            <Button colorScheme='teal' onClick={unSell}>Button</Button>
                            <Button colorScheme='red' onClick={onClose}>Cancle</Button>
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        </>
    )
}