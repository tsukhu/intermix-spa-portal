import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";

registerApplication(
  "@intermix/layout",
  () => System.import("@intermix/layout"),
  isActive.layout
);

registerApplication(
  "@intermix/dashboard",
  () => System.import("@intermix/dashboard"),
  isActive.dashboard
);

start();