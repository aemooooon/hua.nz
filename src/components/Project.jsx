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
    className: "custom-marker",
    html: '<div class="marker-icon"></div>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

const Project = () => {
    const mapRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");

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
        const filtered = locationData.locations.filter((loc) => category === "All" || loc.type === category);
        flyToFilteredLocations(filtered);
    };

    const flyToMarker = (coordinates) => {
        if (mapRef.current) {
            mapRef.current.flyTo(coordinates, 12, { animate: true, duration: 1.5 });
        }
    };

    const flyToFilteredLocations = (locations) => {
        if (mapRef.current && locations.length > 0) {
            const bounds = L.latLngBounds(locations.map((loc) => loc.coordinates));
            mapRef.current.flyToBounds(bounds, {
                padding: [50, 50], // Add some padding around the markers
                maxZoom: 10, // Prevent zoom from being too close
                animate: true,
                duration: 1.5,
            });
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

    const filteredLocations = locationData.locations.filter(
        (loc) => activeCategory === "All" || loc.type === activeCategory
    );

    return (
        <>
            <section className="mt-24 mx-8 text-white overflow-hidden">
                <div id="map" className="relative h-full rounded-lg shadow-lg overflow-hidden">
                    {/* Filter Buttons */}
                    <div className="absolute flex flex-col top-1/2 right-4 transform -translate-y-1/2 space-y-4 z-[2000] pointer-events-auto">
                        {["All", "project", "work", "education"].map((category) => (
                            <button
                                key={category}
                                onClick={() => handleFilterChange(category)}
                                className={`btn px-4 py-2 rounded shadow-lg border-2 transition duration-300 ${
                                    activeCategory === category
                                        ? "bg-secondary text-white"
                                        : "border-secondary text-white hover:bg-secondary hover:text-black"
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
                        style={{ width: "100%", height: "calc(100vh - 15rem)" }}
                        zoomControl={false}
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
                                        click: () => flyToMarker(loc.coordinates),
                                    }}
                                >
                                    <Popup>
                                        <div>
                                            <h3>{loc.title}</h3>
                                            <p>{loc.description}</p>
                                            <a href={loc.link} target="_blank" rel="noopener noreferrer">
                                                Learn more
                                            </a>
                                        </div>
                                    </Popup>
                                </Marker>
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
        if (map && !mapRef.current) {
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

export default Project;
