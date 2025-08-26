import React, { useState } from "react";
import SidebarItem from "./SidebarItem";

import dashboard from "../assets/Icon/dashboard-svgrepo-com-2.svg";
import location from "../assets/Icon/location-svgrepo-com-2.svg";

const Sidebar = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleCurrentStep = (step) => setCurrentStep(step);
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
    </div>
  );
};

export default Sidebar;
