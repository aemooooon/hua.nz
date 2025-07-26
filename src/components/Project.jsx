import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    MapContainer,
    TileLayer,
    Marker,
    LayersControl,
    ScaleControl,
    useMap,
    ZoomControl,
    Pane,
    Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import "leaflet/dist/leaflet.css";
import locationData from "../assets/locations";
import MarkerClusterGroup from "react-leaflet-cluster";
import ImageWithLoader from "./ImageWithLoader";
import {
    FaCalendarAlt,
    FaFilter,
    FaGraduationCap,
    FaBriefcase,
    FaProjectDiagram,
    FaRunning,
    FaMapMarkerAlt,
} from "react-icons/fa";

const customMarkerIcon = L.divIcon({
    className: "custom-marker animate-hueRotate",
    html: '<div class="marker-icon"></div>',
    iconSize: [30, 30],
    iconAnchor: [20, 40],
});

const Project = ({ setActiveSection = () => {}, setCurrentEffect = () => {} }) => {
    const mapRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [filteredLocations, setFilteredLocations] = useState(locationData.locations);

    // Function to calculate centroid of filtered locations
    const calculateCentroid = (locations) => {
        const total = locations.length;
        if (total === 0) return [0, 0];
        const sumLat = locations.reduce((acc, loc) => acc + loc.coordinates[0], 0);
        const sumLon = locations.reduce((acc, loc) => acc + loc.coordinates[1], 0);
        return [sumLat / total, sumLon / total];
    };

    const filterButtons = [
        { label: "All", value: "all", icon: <FaFilter /> },
        { label: "Projects", value: "project", icon: <FaProjectDiagram /> },
        { label: "Work", value: "work", icon: <FaBriefcase /> },
        { label: "Education", value: "education", icon: <FaGraduationCap /> },
        { label: "Activities", value: "activity", icon: <FaRunning /> },
    ];

    const handleFilterChange = (value) => {
        setActiveCategory(value);
        setSelectedLocation(null);
        const newFilteredLocations = locationData.locations.filter((loc) => {
            return (loc.type === value || value === "all") && loc.coordinates;
        });
        setFilteredLocations(newFilteredLocations);
        flyToFilteredLocations(newFilteredLocations);
    };

    const flyToMarker = (coordinates) => {
        try {
            if (!mapRef.current || !coordinates) return;
            mapRef.current.flyTo(coordinates, 16, { animate: true, duration: 1.5 });
        } catch (error) {
            console.error("Map flyTo failed:", error);
        }
    };

    const flyToFilteredLocations = (locations) => {
        if (!mapRef.current || locations.length === 0) return;
        if (locations.length === 1) {
            mapRef.current.flyTo(locations[0].coordinates, 10, { animate: true, duration: 1.5 });
        } else {
            setTimeout(() => {
                const bounds = L.latLngBounds(locations.map((loc) => loc.coordinates));
                if (mapRef.current) {
                    mapRef.current.flyToBounds(bounds, {
                        padding: [100, 100],
                        maxZoom: 10,
                        animate: true,
                        duration: 1.5,
                    });
                }
            }, 100);
        }
    };

    const createCustomClusterIcon = (cluster) => {
        const childCount = cluster.getChildCount();
        return L.divIcon({
            html: `<div class="custom-cluster"><span class="custom-cluster-icon">${childCount}</span></div>`,
            className: "custom-cluster-container",
            iconSize: [60, 60], // 确保 icon 大小正确
            iconAnchor: [30, 30], // **设置锚点为正中心**
        });
    };

    const handleMapClick = () => {
        setSelectedLocation(null);
    };

    useEffect(() => {
        const mapInstance = mapRef.current;
        if (mapInstance) {
            mapInstance.on("click", handleMapClick);
        }

        return () => {
            if (mapInstance) {
                mapInstance.off("click", handleMapClick);
            }
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;
    }, [mapRef, activeCategory]);

    useEffect(() => {
        if (!mapRef.current) return;
        const mapContainer = mapRef.current.getContainer();

        if (selectedLocation) {
            requestAnimationFrame(() => mapRef.current.invalidateSize());
        }

        if (selectedLocation) {
            mapContainer.classList.add("rounded-tr-xl", "rounded-br-xl");
            mapContainer.classList.remove("rounded-xl");
        } else {
            mapContainer.classList.add("rounded-xl");
            mapContainer.classList.remove("rounded-tr-xl", "rounded-br-xl");
        }

        setTimeout(() => {
            if (mapRef.current) mapRef.current.invalidateSize();
        }, 300);
    }, [selectedLocation]);

    if (filteredLocations.length === 0) {
        return (
            <div className="flex justify-center items-center h-full text-white">
                <span className="text-2xl">No locations found.</span>{" "}
                <span
                    onClick={() => {
                        setActiveSection("home");
                        setCurrentEffect("effectfuse");
                    }}
                    className="ml-10 text-xl rounded-full border-2 w-10 h-10 flex justify-center items-center border-red-500 cursor-pointer text-red-500 font-bold group-hover:scale-110 group-hover:rotate-90 transition-all duration-300 ease-in-out"
                >
                    ✕
                </span>
            </div>
        );
    }

    return (
        <>
            <div
                onClick={() => {
                    setActiveSection("home");
                    setCurrentEffect("effectfuse");
                }}
                className="absolute z-[2000] w-10 h-10 flex justify-center items-center rounded-full top-[-25px] right-[-25px] bg-red-600 hover:bg-accent transition-colors duration-300 cursor-pointer group shadow-lg"
            >
                <span className="text-white text-xl font-bold group-hover:scale-110 group-hover:rotate-90 transition-all duration-300 ease-in-out">
                    ✕
                </span>
            </div>
            <section className="text-white overflow-hidden w-full h-full animate-zoomIn transition-all duration-500 ease-in-out">
                <div id="map" className="relative h-full overflow-hidden flex justify-center items-center">
                    {selectedLocation && (
                        <div
                            className={`top-0 w-3/5 h-full text-white p-6 overflow-auto z-[2000] animate-zoomIn info-panel ${
                                selectedLocation ? "open" : ""
                            }`}
                        >
                            <div onClick={() => setSelectedLocation(null)} className="z-[1000] sticky w-full h-12 flex justify-end items-center">
                                <span className="text-white w-10 h-10 flex justify-center items-center text-xl font-bold rounded-full top-[5px] right-[5px] bg-accent hover:bg-red-600 hover:rotate-180 transition-all duration-300 cursor-pointer shadow-lg">
                                    &larr;
                                </span>
                            </div>
                            <h3 className="font-bold mt-4 text-2xl font-audiowide capitalize text-white-800 mb-2">
                                {selectedLocation.title || "Location"}
                            </h3>

                            {selectedLocation.img && (
                                <div className="mt-4 space-y-4">
                                    {Array.isArray(selectedLocation.img) ? (
                                        selectedLocation.img.map((imgSrc, index) => (
                                            <ImageWithLoader key={index} src={imgSrc} alt={`Location ${index + 1}`} />
                                        ))
                                    ) : (
                                        <ImageWithLoader src={selectedLocation.img} alt="Location" />
                                    )}
                                </div>
                            )}
                            {selectedLocation.link && (
                                <a
                                    href={selectedLocation.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 text-right block text-blue-400 hover:underline"
                                >
                                    Learn more →
                                </a>
                            )}
                        </div>
                    )}

                    <MapContainer
                        ref={mapRef}
                        center={calculateCentroid(locationData.locations)}
                        zoom={3}
                        scrollWheelZoom
                        style={{ width: "100%", height: "100%" }}
                        zoomControl={false}
                        className={`border border-white/38 ${
                            selectedLocation ? "rounded-tr-xl rounded-br-xl" : "rounded-xl"
                        }`}
                    >
                        <MapInstanceSetter mapRef={mapRef} />
                        <Pane name="popupOnTop" style={{ zIndex: 1000 }}></Pane>
                        <LayersControl position="topright">
                            <LayersControl.BaseLayer checked name="Street">
                                <TileLayer
                                    attribution="© OpenStreetMap contributors"
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="Satellite">
                                <TileLayer
                                    attribution="© OpenTopoMap contributors"
                                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>
                        </LayersControl>

                        <ScaleControl position="bottomright" />
                        <ZoomControl position="topright" />

                        <MarkerClusterGroup 
                            iconCreateFunction={createCustomClusterIcon}
                            key={filteredLocations.length} // Force re-render on data change
                        >
                            {filteredLocations.map((loc, index) => (
                                <Marker
                                    key={index}
                                    position={loc.coordinates}
                                    icon={customMarkerIcon}
                                    eventHandlers={{
                                        click: () => {
                                            flyToMarker(loc.coordinates);
                                            setSelectedLocation(loc);
                                        },
                                    }}
                                >
                                    <Popup
                                        offset={[-5, -42]}
                                        autoPan={true}
                                        eventHandlers={{
                                            remove: () => {
                                                if (mapRef.current) setSelectedLocation(null);
                                            },
                                        }}
                                        className="custom-popup"
                                        maxWidth={600}
                                    >
                                        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-xl border border-gray-200">
                                            <h3 className="font-bold text-xl font-audiowide capitalize text-gray-800 mb-2">
                                                {loc.type}
                                            </h3>
                                            {loc.name && (
                                                <h3 className="text-xl mt-2 text-gray-700 font-poppins">{loc.name}</h3>
                                            )}

                                            {loc.description && (
                                                <p className="text-gray-600 leading-relaxed text-base">
                                                    {loc.description}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <FaMapMarkerAlt className="text-blue-500 text-base font-mono" />{" "}
                                                    <span className="text-gray-700 text-base">{loc.location}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <FaCalendarAlt className="text-purple-500 text-base" />{" "}
                                                    <span className="text-gray-700 text-sm">{loc.year}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MarkerClusterGroup>
                    </MapContainer>

                    {/* Filter Buttons */}
                    <div className="absolute flex flex-col top-1/2 right-2 transform -translate-y-1/2 space-y-2 z-[2000] pointer-events-auto">
                        {filterButtons.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => handleFilterChange(category.value)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${
                                    activeCategory === category.value
                                        ? "bg-gradient-to-r from-green-600 to-green-900 text-white transform scale-110"
                                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                <span className="text-lg">{category.icon}</span> {/* 图标 */}
                                <span>{category.label}</span> {/* 文字 */}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

const MapInstanceSetter = ({ mapRef }) => {
    const map = useMap();
    useEffect(() => {
        if (map) {
            mapRef.current = map;
        }
    }, [map, mapRef]);
    return null;
};

MapInstanceSetter.propTypes = {
    mapRef: PropTypes.shape({
        current: PropTypes.object,
    }).isRequired,
};

Project.propTypes = {
    setActiveSection: PropTypes.func,
    setCurrentEffect: PropTypes.func,
};

export default Project;
