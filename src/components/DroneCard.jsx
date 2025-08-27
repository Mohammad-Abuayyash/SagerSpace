import React from "react";

import red from "../assets/status/red.svg";
import green from "../assets/status/green.svg";

const DroneCard = ({ drone, isActive, onClick, ref }) => {
  const { Name, serial, altitude, registration, pilot, organization } =
    drone.properties;

  return (
    <div
      className={`w-full py-4 border-b-[1px] border-black text-white cursor-pointer ${
        isActive ? "bg-[#272727]" : "bg-[#111111]"
      }`}
      onClick={onClick}
    >
      <strong className="uppercase">{Name}</strong>
      <div className="flex justify-between items-center">
        <div className="w-[80%]">
          <div className="flex justify-between mb-2 mt-2">
            <div className="text-[0.7rem]">
              <p className="text-[#CCCCCC] mb-0">Serial #</p>
              <strong className="text-[#CCCCCC] mt-0">{serial}</strong>
            </div>
            <div className="text-[0.7rem]">
              <p className="text-[#CCCCCC] mb-0">Registration #</p>
              <strong className="text-[#CCCCCC] mt-0">{registration}</strong>
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-[0.7rem]">
              <p className="text-[#CCCCCC] mb-0">Pilor #</p>
              <strong className="text-[#CCCCCC] mt-0">{pilot}</strong>
            </div>
            <div className="text-[0.7rem]">
              <p className="text-[#CCCCCC] mb-0">Organization #</p>
              <strong className="text-[#CCCCCC] mt-0">{organization}</strong>
            </div>
          </div>
        </div>
        <img
          src={registration.split("-")[1][0] === "B" ? green : red}
          alt={registration.split("-")[1][0] === "B" ? "green" : "red"}
          className="h-fit border  rounded-full  border-amber-50"
        />
      </div>
    </div>
  );
};

export default DroneCard;
