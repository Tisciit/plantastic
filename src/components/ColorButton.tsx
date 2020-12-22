import * as React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { BsSun, BsMoon } from "react-icons/bs";

export const ToggleColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      icon={colorMode === "dark" ? <BsSun /> : <BsMoon />}
      aria-label="Toggle Color Mode"
    />
  );
};
