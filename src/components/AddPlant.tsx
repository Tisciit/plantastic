import React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
} from "@chakra-ui/react";
import { Plant } from "../api/types";
import { addPlant } from "../api/database";
import { Camera } from "./Camera";

export const AddPlant = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = React.useState("");
  const [cycle, setCycle] = React.useState(0);
  const [image, setImage] = React.useState("");
  const [page, setPage] = React.useState(0);
  const closeModal = () => {
    setName("");
    setCycle(0);
    setImage("");
    setPage(0);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p: Plant = {
      created: new Date(),
      lastWatered: new Date(),
      name,
      image,
      cycleDays: cycle,
    };
    addPlant(p);
    //Clear Controls
    closeModal();
  };

  const nextPage = () => {
    if (page < 1) setPage(page + 1);
  };

  return (
    <>
      <Button onClick={onOpen}>Add Plant</Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent h="lg" p={2} w="sm">
          <ModalHeader>Add Plant</ModalHeader>
          <ModalCloseButton />
          <ModalBody position="relative">
            <form onSubmit={handleSubmit}>
              <Box hidden={page !== 0}>
                <FormControl isRequired>
                  <FormLabel>Beatiful Image</FormLabel>
                  <Camera
                    width={200}
                    height={200}
                    onSnap={(d) => {
                      console.log(d);
                      setImage(d);
                      nextPage();
                    }}
                  />
                </FormControl>
              </Box>
              <Box hidden={page !== 1}>
                <Center>
                  <Image src={image} />
                </Center>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    onChange={({ target }) => {
                      setName(target.value);
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Water every days?</FormLabel>
                  <NumberInput
                    onChange={(str, num) => {
                      setCycle(num);
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <Button my={2} type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
