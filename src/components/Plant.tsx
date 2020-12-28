import * as React from "react";

import { Box, Grid, GridItem, Icon, Image } from "@chakra-ui/react";
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
      <Image width={"full"} src={plant.image} alt={plant.name} />
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
