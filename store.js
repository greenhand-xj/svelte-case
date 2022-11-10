import { writable, readable } from "svelte/store";
import { api } from "./api";

export const selected = writable("react");

export const setSelected = (topic) => selected.set(topic);

export const repos = readable(
  {
    status: "idle",
    items: [],
    error: null
  },
  (set) => {
    let currentController = null;
    let unsubscribe = selected.subscribe((val) => {
      if (currentController) {
        currentController.abort();
      }
      set({
        status: "loading",
        items: [],
        error: null
      });
      const [response, controller] = api(val.toLowerCase());
      currentController = controller;

      response
        .then((data) => {
          currentController = null;
          set({
            status: "loaded",
            items: data.items,
            error: null
          });
        })
        .catch((err) => {
          set({
            status: "error",
            items: [],
            error: err
          });
        });
    });
    return () => {
      unsubscribe();
    };
  }
);
