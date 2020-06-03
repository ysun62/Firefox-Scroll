/*global browser*/
import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Enabled");

  // After popup component mounts, set the tate based
  // on the data retrieved from localstorage
  useEffect(() => {
    browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      browser.storage.local.get(`${tabs[0].url}`, (data) => {
        switch (data[tabs[0].url]) {
          case "Disabled":
            setStatus("Disabled");
            browser.tabs.sendMessage(tabs[0].id, "disable");
            break;

          case "Enabled":
            setStatus("Enabled");
            browser.tabs.sendMessage(tabs[0].id, "enable");
            break;

          default:
            setStatus("Enabled");
            break;
        }
      });
    });
  }, []);

  // This function communicates to content.js
  const handleChange = () => {
    browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      let obj = {};
      let url = tabs[0].url;

      if (status === "Enabled") {
        obj[url] = "Disabled";
        browser.tabs.sendMessage(tabs[0].id, "disable");
        setStorage(obj, url);
      } else if (status === "Disabled") {
        obj[url] = "Enabled";
        browser.tabs.sendMessage(tabs[0].id, "enable");
        setStorage(obj, url);
      }
    });
  };

  // Util function
  const setStorage = (obj, url) => {
    browser.storage.local.set(obj, () => {
      setStatus(obj[url]);
    });
  };

  return (
    <div className="App">
      <div className="modal-header">
        <h1 className="logo flex-container">
          <img
            className="logo-icon"
            src={require("./icon150.png")}
            alt="logo"
          />
          <span>Disable Scrolling</span>
        </h1>
      </div>
      <div className="flex-container modal-content">
        <h4>Current Status: Scrolling {status}</h4>
        <Switch
          checked={status === "Disabled"}
          onChange={handleChange}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={10}
          width={48}
          className="react-switch"
          id="material-switch"
        />
      </div>
    </div>
  );
}

export default App;
