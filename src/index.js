import "flowbite";
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./import-all-css";
import reportWebVitals from "./reportWebVitals";
import store from './store/store'
import {Provider} from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container); // createRo
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
