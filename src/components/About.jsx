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

const About = () => {
    const mapRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");

    const calculateCentroid = (locations) => {
        const total = locations.length;
        const sumLat = locations.reduce((acc, loc) => acc + loc.coordinates[0], 0);
        const sumLon = locations.reduce((acc, loc) => acc + loc.coordinates[1], 0);
        return [sumLat / total, sumLon / total];
    };

    const centroid = calculateCentroid(locationData.locations);

    const flyToMarker = (coordinates) => {
        if (mapRef.current) {
            mapRef.current.flyTo(coordinates, 12, { animate: true, duration: 1.5 });
        }
    };

    const createCustomClusterIcon = (cluster) => {
        // Count markers in the cluster
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
            <section className="my-36 mx-12 text-white overflow-hidden" style={{ maxHeight: "calc(100vh - 300px)" }}>
                <div id="map" className="relative">
                    {/* Filter Buttons */}
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 space-y-4 z-[2000] pointer-events-auto">
                        {["All", "work", "project", "education"].map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`btn px-4 py-2 rounded shadow-lg border-2 ${
                                    activeCategory === category
                                        ? "bg-secondary text-white"
                                        : "border-secondary text-white"
                                } transition hover:bg-secondary hover:text-bg`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                    <MapContainer
                        center={centroid}
                        zoom={3}
                        scrollWheelZoom
                        style={{ width: "100%", height: "75vh" }}
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

export default About;
