import * as React from "react";
import { Flex, Box, Spacer, Heading, Divider } from "@chakra-ui/react";
import { ToggleColorModeButton } from "./ColorButton";

export const Header = () => {
  return (
    <Box background="tomato" py={1} position="sticky" top="0">
      <Flex m={2}>
        <Heading>
          Pl
          <span role="img" aria-label="Ant">
            🐜
          </span>
          Ast!c
        </Heading>
        <Spacer />
        <ToggleColorModeButton />
      </Flex>
      <Divider />
    </Box>
  );
};
