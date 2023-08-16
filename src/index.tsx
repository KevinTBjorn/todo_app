import { createRoot } from "react-dom/client";
import { App } from "./App";
import React from "react";
import { UIRoot } from "@apollo/apollo-ui-reactjs";

const container = document.getElementById("app")!;
const root = createRoot(container)
root.render(<UIRoot theme="skov" layout="default"><App /></UIRoot>);