import * as React from "react";

import {
  Box,
  Grid,
  GridItem,
  Icon,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ButtonGroup,
  Center,
} from "@chakra-ui/react";
import { BsDroplet } from "react-icons/bs";
import { Plant } from "../api/types";
import { addPlant } from "../api/database";
import { getDateDifDays, dateAddDays } from "../utils";
import { Camera } from "./Camera";

export const PlantListItem = (props: {
  plant: Plant;
  selected: boolean;
  onItemClick: Function;
}) => {
  const { plant, selected, onItemClick } = props;
  const nextWater = getDateDifDays(
    dateAddDays(plant.lastWatered, plant.cycleDays),
    new Date()
  );
  return (
    <Box
      mb={3}
      mr={3}
      p={2}
      w="100px"
      borderWidth={2}
      borderRadius="lg"
      borderColor={selected ? "lightblue" : ""}
      onClick={() => {
        onItemClick(plant);
      }}
      cursor="pointer"
      userSelect="none"
    >
      <Image src={plant.image} alt={plant.name} />
      <Grid templateColumns="30% 70%">
        <GridItem textAlign="center" gridColumn="1/3">
          {plant.name}
        </GridItem>
        <Icon as={BsDroplet} height="full" />
        <GridItem>{nextWater} days</GridItem>
      </Grid>
    </Box>
  );
};

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
                  <Camera />
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
                <FormControl isRequired>
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
                  />
                  <Image boxSize="100px" src={image} />
                </FormControl>
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
