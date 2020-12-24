import * as React from "react";
import { Header, PlantList, Footer, AddPlant } from "./components";
import { getDateDifDays, dateAddDays } from "./utils";
import { useData } from "./hooks/useData";
import { Box, Button } from "@chakra-ui/react";
import { Plant } from "./api/types";
import { updatePlant, deletePlant } from "./api/database";
import { Camera } from "./components/Camera";

export const App = () => {
  const data = useData();
  const [selection, setSelection] = React.useState<Plant[]>([]);

  const onItemClick = (p: Plant) => {
    const index = selection.indexOf(p);
    //Item is new
    if (index === -1) setSelection([...selection, p]);
    //Item is unselected
    else setSelection(selection.filter((elt) => elt.created !== p.created));
  };
  const waterItems = () => {
    for (const p of selection) {
      p.lastWatered = new Date();
      updatePlant(p);
    }
    setSelection([]);
  };
  const removeItems = () => {
    for (const p of selection) {
      deletePlant(p);
    }
  };

  data.sort(
    (a, b) =>
      getDateDifDays(dateAddDays(a.lastWatered, a.cycleDays), new Date()) -
      getDateDifDays(dateAddDays(b.lastWatered, b.cycleDays), new Date())
  );
  return (
    <Box h="100vh">
      <Header />

      <PlantList
        plants={data}
        selection={selection}
        onItemClick={onItemClick}
      />
      <Footer>
        <Button
          disabled={selection.length === 0}
          onClick={() => {
            waterItems();
          }}
        >
          Watered!
        </Button>
        <Button
          disabled={selection.length === 0}
          onClick={() => {
            removeItems();
          }}
        >
          Remove
        </Button>
        <AddPlant />
      </Footer>
    </Box>
  );
};
