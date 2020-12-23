import React from "react";
import { Flex, Box, Spacer, ButtonGroup } from "@chakra-ui/react";

export const Footer = (props: any) => {
  const { children, ...rest } = props;
  return (
    <Box
      backgroundColor="tomato"
      w="full"
      position="fixed"
      bottom="0"
      {...rest}
    >
      <Flex py={1}>
        <Spacer />
        <ButtonGroup>{children ? children : <></>}</ButtonGroup>
        <Spacer />
      </Flex>
    </Box>
  );
};
