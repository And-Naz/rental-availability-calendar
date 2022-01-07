import { createContext, useContext } from "react";
export const Context = createContext();
export const Provider = Context.Provider;
export const Consumer = Context.Consumer;
export default function useRecordsContext() {
  return {
    Context,
    Provider,
    Consumer,
    Value: useContext(Context)
  };
}
