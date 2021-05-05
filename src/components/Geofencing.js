import React from 'react';
import { MapContainer, Polygon, Popup, TileLayer } from 'react-leaflet';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(response => response.json());

const revertCoords = (coords) => coords[0][0].map(item => [item[1], item[0]]);

const Geofencing = () => {
  const url = 'https://mds.bird.co/gbfs/rome/geofencing_zone_information.json';
  const { data, error } = useSWR(url, { fetcher });
  const zones = data && !error ? data.data.geofencing_zones.slice(0, 100) : [];
  const purpleOptions = { color: 'red' };

  return (
    <MapContainer center={[41.90796980168461, 12.490033578755371]} zoom={13}
                  scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {zones.map(zone => <Polygon key={zone.geofencing_zone_id}
                                  pathOptions={purpleOptions}
                                  positions={revertCoords(zone.zone_area.coordinates)}>
        <Popup>
          <p>
            Zone ID: {zone.geofencing_zone_id}
          </p>
        </Popup>
      </Polygon>)}
    </MapContainer>
  );
};

export default Geofencing;
