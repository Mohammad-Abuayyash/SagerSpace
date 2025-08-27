/* global process */

import { useRef, useEffect, useContext, createElement } from "react";
import mapboxgl from "mapbox-gl";
import droneImg from "../assets/Icon/drone.svg";

import "../index.css";

import "mapbox-gl/dist/mapbox-gl.css";
import { DroneContext } from "../providers/droneProvider";
const MapPage = () => {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const { drones, selectedDrone, setSelectedDrone } = useContext(DroneContext);

  useEffect(() => {
    try {
      mapboxgl.accessToken = import.meta.env.VITE_API_KEY;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [35.93131881204147, 31.94878648036645],
        zoom: 12.12,
      });

      return () => {
        mapRef.current.remove();
      };
    } catch (err) {
      console.log("error is that: " + err);
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Keep track of markers to remove on update
    const markers = [];

    drones.forEach((drone) => {
      const el = document.createElement("div");
      el.className = `w-8 h-8 rounded-full p-1 relative ${
        drone.properties.registration.split("-")[1][0] === "B"
          ? "bg-[#24FF00]"
          : "bg-[#F9000E]"
      }`; // Tailwind styles

      const img = document.createElement("img");
      img.setAttribute("src", droneImg);

      el.appendChild(img);

      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        setSelectedDrone(drone); // <-- update context when marker is clicked
      });

      el.addEventListener("mouseenter", () =>
        marker.getPopup().addTo(mapRef.current)
      );
      el.addEventListener("mouseleave", () => marker.getPopup().remove());

      const marker = new mapboxgl.Marker(el)
        .setLngLat(drone.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({
            offset: 55,
            closeButton: false,
            closeOnClick: false,
          }).setHTML(`
  <div class="bg-black text-xs w-full text-white rounded-lg p-3">
    <strong class="block mb-2">${drone.properties.Name}</strong>
    <div class="flex justify-between gap-4">
      <div class="text-[0.7rem]">
        <p class="text-[#CCCCCC] mb-0">Altitude</p>
        <strong>${drone.properties.altitude} m</strong>
      </div>
      <div class="text-[0.7rem]">
        <p class="text-[#CCCCCC] mb-0">Flight Time</p>
        <strong>${drone.arrivalTime}</strong>
      </div>
    </div>
    <!-- custom arrow -->
    <div class="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 
                border-l-8 border-r-8 border-t-8 
                border-l-transparent border-r-transparent border-t-black"></div>
  </div>
`)
        )
        .addTo(mapRef.current);

      markers.push(marker);
    });

    // Cleanup old markers on re-render
    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [drones]);

  useEffect(() => {
    if (!mapRef.current || !selectedDrone) return;

    mapRef.current.flyTo({
      center: selectedDrone.geometry.coordinates,
      zoom: 18, // zoom in closer
      essential: true,
    });
  }, [selectedDrone]);

  return (
    <>
      <div
        id="map-container"
        ref={mapContainerRef}
        className="w-full h-screen relative"
      >
        <div className="absolute z-20 bottom-[5%] right-5">
          <div className="flex items-center justify-center bg-[#D9D9D9] rounded-[10px] py-2 px-4 gap-2">
            <div className="w-7 h-7 text-[10px] font-bold text-white bg-black rounded-full flex items-center justify-center">
              {
                drones.filter(
                  (drone) =>
                    drone.properties.registration.split("-")[1][0] !== "B"
                ).length
              }
            </div>
            <span className="text-[12px] text-black tracking-wider">
              Drone Flying
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapPage;
