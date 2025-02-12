import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    LayersControl,
    ScaleControl,
    useMap,
    ZoomControl,
    Pane,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import "leaflet/dist/leaflet.css";
import locationData from "../assets/locations";
import MarkerClusterGroup from "react-leaflet-cluster";

const customMarkerIcon = L.divIcon({
    className: "custom-marker animate-hueRotate",
    html: '<div class="marker-icon"></div>',
    iconSize: [30, 30],
    iconAnchor: [20, 40],
});

const Project = ({ setActiveSection, setCurrentEffect }) => {
    const mapRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Function to calculate centroid of filtered locations
    const calculateCentroid = (locations) => {
        const total = locations.length;
        if (total === 0) return [0, 0];
        const sumLat = locations.reduce((acc, loc) => acc + loc.coordinates[0], 0);
        const sumLon = locations.reduce((acc, loc) => acc + loc.coordinates[1], 0);
        return [sumLat / total, sumLon / total];
    };

    const handleFilterChange = (category) => {
        setActiveCategory(category);
        const filtered = locationData.locations.filter((loc) => loc.type === category || category === "All");
        flyToFilteredLocations(filtered);
    };

    const flyToMarker = (coordinates) => {
        if (mapRef.current && coordinates) {
            mapRef.current.flyTo(coordinates, 16, { animate: true, duration: 1.5 });
        }
    };

    const flyToFilteredLocations = (locations) => {
        if (mapRef.current && locations.length > 0) {
            if (locations.length === 1) {
                mapRef.current.flyTo(locations[0].coordinates, 10, { animate: true, duration: 1.5 });
            } else {
                setTimeout(() => {
                    const bounds = L.latLngBounds(locations.map((loc) => loc.coordinates));
                    mapRef.current.flyToBounds(bounds, {
                        padding: [100, 100],
                        maxZoom: 10,
                        animate: true,
                        duration: 1.5,
                    });
                }, 100);
            }
        }
    };

    const createCustomClusterIcon = (cluster) => {
        const childCount = cluster.getChildCount();
        return L.divIcon({
            html: `<div class="custom-cluster-icon">${childCount}</div>`,
            className: "custom-cluster",
            iconSize: [40, 40],
        });
    };

    const isValidCoordinates = (coordinates) => {
        return (
            Array.isArray(coordinates) &&
            coordinates.length === 2 &&
            typeof coordinates[0] === "number" &&
            typeof coordinates[1] === "number"
        );
    };

    const filteredLocations = locationData.locations.filter((loc) => isValidCoordinates(loc.coordinates));

    useEffect(() => {
        if (!mapRef.current) return;
    }, [mapRef, activeCategory]);

    if (filteredLocations.length === 0) {
        return <div className="text-center text-gray-500 mt-8">No locations found.</div>;
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
            <section className="text-white overflow-hidden w-full h-full animate-zoomIn">
                <div id="map" className="relative h-full overflow-hidden">
                    {selectedLocation && (
                        <div className="absolute top-0 left-0 w-2/5 h-full bg-accent text-white p-4 overflow-auto z-[2000] rounded-tl-xl rounded-bl-xl ">
                            <button
                                className="absolute top-4 right-4 text-xl font-bold text-white hover:text-red-500"
                                onClick={() => setSelectedLocation(null)}
                            >
                                ✕
                            </button>
                            <h3 className="font-bold text-2xl">{selectedLocation.title || "Location"}</h3>
                            {selectedLocation.name && <h3 className="text-xl mb-2">{selectedLocation.name}</h3>}
                            {selectedLocation.year && <h3 className="text-xl italic mb-2">{selectedLocation.year}</h3>}
                            {selectedLocation.img && (
                                <img
                                    src={selectedLocation.img}
                                    className="object-cover rounded-md mx-auto mt-4 max-h-fit"
                                    alt="Location"
                                />
                            )}
                            {selectedLocation.description && <p className="mt-2">{selectedLocation.description}</p>}
                            {selectedLocation.link && (
                                <a
                                    href={selectedLocation.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 block text-blue-400 hover:underline"
                                >
                                    Learn more →
                                </a>
                            )}
                        </div>
                    )}

                    {/* Filter Buttons */}
                    <div className="absolute flex flex-col top-1/2 right-4 transform -translate-y-1/2 space-y-4 z-[2000] pointer-events-auto">
                        {["All", "education", "work", "project"].map((category) => (
                            <button
                                key={category}
                                onClick={() => handleFilterChange(category)}
                                className={`btn px-4 py-2 rounded shadow-lg border-2 transition duration-300 ${
                                    activeCategory === category
                                        ? "bg-secondary text-white"
                                        : "border-secondary bg-secondary text-white hover:bg-secondary hover:text-black"
                                }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>

                    <MapContainer
                        center={calculateCentroid(locationData.locations)}
                        zoom={3}
                        scrollWheelZoom
                        style={{ width: "100%", height: "100%" }}
                        zoomControl={false}
                        className="border border-white/38 rounded-xl"
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

                        <MarkerClusterGroup iconCreateFunction={createCustomClusterIcon}>
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
                                />
                            ))}
                        </MarkerClusterGroup>
                    </MapContainer>
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
    setActiveSection: PropTypes.func.isRequired,
    setCurrentEffect: PropTypes.func.isRequired,
};

export default Project;
