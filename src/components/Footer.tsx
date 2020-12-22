import React from "react";
import {
  Flex,
  Box,
  Spacer,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { AddPlant } from "./Plant";
import { Plant } from "../api/types";

export const Footer = (props: {
  selection: Plant[];
  fWater: Function;
  fRemove: Function;
}) => {
  const { selection, fWater, fRemove } = props;

  return (
    <Box backgroundColor="tomato" w="full" position="fixed" bottom="0">
      <Divider />
      <Flex py={1}>
        <Spacer />
        <ButtonGroup>
          <Button
            disabled={selection.length === 0}
            onClick={() => {
              fWater();
            }}
          >
            Watered!
          </Button>
          <Button
            disabled={selection.length === 0}
            onClick={() => {
              fRemove();
            }}
          >
            Remove
          </Button>
          <AddPlant />
        </ButtonGroup>
        <Spacer />
      </Flex>
    </Box>
  );
};
