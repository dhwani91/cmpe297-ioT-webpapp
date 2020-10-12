import React from "react";
import ReactDOM from "react-dom";
import "react-notifications/lib/notifications.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { NotificationContainer } from "react-notifications";
import SavedList from "./component/SavedList";
import IoTHistorical from "./component/IoTHistorical";

function App() {
  return (
    <>
      <NotificationContainer />
      <div className="container my-2">
        <SavedList />
        <IoTHistorical />
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
