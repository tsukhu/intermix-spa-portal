import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";

registerApplication(
  "@intermix/layout",
  () => System.import("@intermix/layout"),
  isActive.navbar
);

start();