import * as React from "react";
import { Plant } from "../api/types";
import { Grid } from "@chakra-ui/react";
import { PlantListItem } from "./Plant";

export const PlantList = (props: {
  plants: Plant[];
  selection: Plant[];
  onItemClick: Function;
}) => {
  const { plants, selection, onItemClick } = props;
  return (
    <Grid
      m={4}
      justifyContent="center"
      templateColumns="repeat(auto-fill,120px)" //TODO: Responisve
    >
      {plants.map((elt, id) => (
        <PlantListItem
          key={id}
          plant={elt}
          selected={selection.indexOf(elt) >= 0}
          onItemClick={onItemClick}
        />
      ))}
    </Grid>
  );
};
