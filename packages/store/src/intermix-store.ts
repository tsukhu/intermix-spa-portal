import "./set-public-path";
export * from "./store/intermix-store-config";
import IntermixGlobalStore from "./store/intermix-global-store";

export function getGlobalStore() {
  return IntermixGlobalStore.getInstance();
}
