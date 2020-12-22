import { Plant } from "./types";

const DB = "plantastic";
const plantStore = "plants";
const VER = 2;

//Holds callbacks provided in subscribeUpdateOnce()
const callbacks: Function[] = [];

/**
 * Open the database
 */
const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB, VER);

    request.onupgradeneeded = (event) => {
      /* TODO: Build Database */
      const db = request.result;
      db.createObjectStore(plantStore, {
        keyPath: "created",
      });
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = (ev) => {
      reject(`Unknown error occured ${ev}`);
    };
    request.onblocked = () => {
      reject(`User blocked input`);
    };
  });
};

//Subscribe to updates to the database
export const subscribeUpdateOnce = (callback: Function) => {
  callbacks.push(callback);
};

//Get all plants from the database
export const loadPlants = (): Promise<Plant[]> => {
  return new Promise((resolve) => {
    openDatabase().then((idb) => {
      const store = idb
        .transaction(plantStore, "readonly")
        .objectStore(plantStore);

      const request = store.getAll();
      request.onsuccess = (ev) => {
        //@ts-ignore
        resolve(ev.target.result);
      };
      request.onerror = () => {
        console.error("Error reading indexed db");
        resolve([]);
      };
    });
  });
};

//Execute all callbacks and remove them
const onUpdate = () => {
  loadPlants().then((plants) => {
    console.log({ plants });
    for (const c of callbacks) {
      c(plants);
      callbacks.splice(0, 1); //remove event callbak
    }
  });
};

/**
 * Adds an item to the database
 * @param item The plant item to add
 */
export const addPlant = async (item: Plant) => {
  openDatabase().then((idb) => {
    const store = idb
      .transaction(plantStore, "readwrite")
      .objectStore(plantStore);

    const r = store.add(item);
    r.onerror = () => {
      console.log(`Error writing item ${item}`);
      onUpdate();
    };
    r.onsuccess = () => {
      console.log(`Success!`);
      onUpdate();
    };
  });
};

/**
 * Deletes an item from the database
 * @param item The plant item to delete
 */
export const deletePlant = async (item: Plant) => {
  openDatabase().then((idb) => {
    const store = idb
      .transaction(plantStore, "readwrite")
      .objectStore(plantStore);

    store.delete(item.created);
    onUpdate();
  });
};

/**
 * Updates an item in the database or creates it if it is new
 * @param item The plant item to update
 */
export const updatePlant = async (item: Plant) => {
  openDatabase().then((idb) => {
    const store = idb
      .transaction(plantStore, "readwrite")
      .objectStore(plantStore);

    store.put(item);
    onUpdate();
  });
};
