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
} from "@chakra-ui/react";
import { BsDroplet } from "react-icons/bs";
import { Plant } from "../api/types";
import { addPlant } from "../api/database";
import { dateDiff, dateAddDays } from "../utils";

export const PlantListItem = (props: {
  plant: Plant;
  selected: boolean;
  onItemClick: Function;
}) => {
  const { plant, selected, onItemClick } = props;
  const nextWater = dateDiff(
    dateAddDays(plant.lastWatered, plant.cycleDays),
    new Date()
  ).days;
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p: Plant = {
      created: new Date(),
      lastWatered: new Date(),
      name,
      image,
      cycleDays: cycle,
    };
    console.log({ p });
    addPlant(p);

    setName("");
    setCycle(0);
    setImage("");

    onClose();
  };
  return (
    <>
      <Button onClick={onOpen}>Add Plant</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={2} w="sm">
          <ModalHeader>Add Plant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
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
              <ButtonGroup my={2}>
                <Button type="submit">Submit</Button>
                <Button onClick={onClose} type="button">
                  Cancel
                </Button>
              </ButtonGroup>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
