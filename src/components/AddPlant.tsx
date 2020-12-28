import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
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
    if (page < 2) setPage(page + 1);
  };
  const previousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <>
      <Button onClick={onOpen}>Add Plant</Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent h="lg" p={2} w="sm">
          <ModalHeader>Add Plant / Page {page}</ModalHeader>
          <ModalCloseButton />
          <ModalBody position="relative">
            <form onSubmit={handleSubmit}>
              <Box hidden={page !== 0}>
                <FormControl isRequired>
                  <FormLabel>Beatiful Image</FormLabel>
                  <Camera
                    width={100}
                    height={100}
                    onSnap={(d) => {
                      console.log(d);
                      setImage(d);
                    }}
                  />
                </FormControl>
              </Box>
              <Box hidden={page !== 1}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    onChange={({ target }) => {
                      setName(target.value);
                    }}
                  />
                </FormControl>
                {/* <FormControl isRequired>
                  <FormLabel>Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      const file = e.target.files[0];
                      if (file) {
                        const x = new FileReader();
                        x.onload = () => {
                          if (!x.result) return;
                          setImage(x.result.toString());
                        };
                        x.readAsDataURL(file);
                      }
                    }}
                  /> */}
                <Image src={image} />
                {/* </FormControl> */}
                <FormControl isRequired>
                  <FormLabel>Water cycle?</FormLabel>
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
              </Box>
              <Box hidden={page !== 2}>
                <Center>
                  <Button type="submit">Submit</Button>
                </Center>
              </Box>
              <Center>
                <ButtonGroup position="absolute" bottom="0" my={2}>
                  <Button
                    onClick={() => {
                      previousPage();
                    }}
                    type="button"
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={() => {
                      nextPage();
                    }}
                    type="button"
                  >
                    Next
                  </Button>
                  <Button onClick={closeModal} type="button">
                    Cancel
                  </Button>
                </ButtonGroup>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
