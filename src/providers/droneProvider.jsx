// src/context/DroneContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const DroneContext = createContext();

export const DroneProvider = ({ children }) => {
  const [drones, setDrones] = useState([]);
  const [selectedDrone, setSelectedDrone] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:9013"); // your backend port

    socket.on("connect", () => {
      console.log("Connected to backend:", socket.id);
    });

    // Listen to 'message' event from backend
    socket.on("message", (data) => {
      // data is like your GenerateData() object
      if (data.features) {
        setDrones((prev) => {
          // Merge drones by serial (avoid duplicates)
          const updated = [...prev];
          data.features.forEach((f) => {
            const index = updated.findIndex(
              (d) => d.properties.serial === f.properties.serial
            );
            if (index > -1) {
              updated[index] = {
                ...updated[index],
                ...f,
              }; // update existing
            } else {
              updated.push({
                ...f,
                arrivalTime: new Date()
                  .toString()
                  .split("GMT")[0]
                  .split(" ")[4],
              }); // store when first seen); // add new
            }
          });
          //   console.log(updated);
          return updated;
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from backend");
    });

    return () => socket.disconnect();
  }, []);

  return (
    <DroneContext.Provider value={{ drones, selectedDrone, setSelectedDrone }}>
      {children}
    </DroneContext.Provider>
  );
};
