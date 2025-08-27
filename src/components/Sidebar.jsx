import React, { useContext, useState } from "react";
import SidebarItem from "./SidebarItem";

import dashboard from "../assets/Icon/dashboard-svgrepo-com-2.svg";
import location from "../assets/Icon/location-svgrepo-com-2.svg";

import { DroneContext } from "../providers/droneProvider";
import DronesSidebar from "./DronesSidebar";

const Sidebar = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const { drones } = useContext(DroneContext);

  const handleCurrentStep = (step) => setCurrentStep(step);

  const renderPageOnStep = () => {
    if (currentStep === 1) return;
    else if (currentStep === 2) {
      return <DronesSidebar handleCurrentStep={handleCurrentStep} />;
    }
  };

  return (
    <div className="flex flex-col py-4 bg-[#111111] h-full w-[10%]">
      <SidebarItem
        icon={dashboard}
        label="DASHBOARD"
        isActive={currentStep === 1}
        onClick={() => handleCurrentStep(1)}
      />
      <SidebarItem
        icon={location}
        label="LOCATION"
        isActive={currentStep === 2}
        onClick={() => handleCurrentStep(2)}
      />

      {renderPageOnStep()}
    </div>
  );
};

export default Sidebar;
