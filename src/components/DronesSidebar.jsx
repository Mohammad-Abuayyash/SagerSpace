// DronesSidebar.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { DroneContext } from "../providers/droneProvider";
import close from "../assets/Icon/close.svg";
import DroneCard from "./DroneCard";

const DronesSidebar = ({ handleCurrentStep }) => {
  const { drones, selectedDrone, setSelectedDrone } = useContext(DroneContext);

  const droneRefs = useRef({});

  // Scroll to selected drone when it changes
  useEffect(() => {
    if (selectedDrone && droneRefs.current[selectedDrone.properties.serial]) {
      droneRefs.current[selectedDrone.properties.serial].scrollIntoView({
        behavior: "smooth",
        block: "center", // center it in the sidebar
      });
    }
  }, [selectedDrone]);
  return (
    <div className="absolute top-[10.4%] left-[10%] py-4 h-full w-[20%] z-30 bg-[#111111] p-4">
      <div className="text-white mb-2 flex justify-between">
        <strong>Drones Flying</strong>
        <img
          src={close}
          alt="close"
          className="w-4 cursor-pointer"
          onClick={() => handleCurrentStep(1)}
        />
      </div>
      <ul className="h-full overflow-y-scroll .hide-scrollbar">
        {drones.map((drone) => (
          <li
            key={drone.properties.serial}
            ref={(el) => (droneRefs.current[drone.properties.serial] = el)}
          >
            <DroneCard
              drone={drone}
              ref={(el) => (droneRefs.current[drone.properties.serial] = el)}
              isActive={
                drone.properties.serial === selectedDrone?.properties.serial
              }
              onClick={() => setSelectedDrone(drone)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DronesSidebar;
