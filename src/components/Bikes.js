import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(response => response.json());

const Bikes = () => {
  const url = 'https://mds.bird.co/gbfs/rome/free_bike_status.json';
  const { data, error } = useSWR(url, { fetcher });
  const bikes = data && !error ? data.data.bikes.slice(0, 100) : [];

  return (
    <MapContainer center={[41.896065, 12.493379]} zoom={13}
                  scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bikes.map(bike => <Marker key={bike.bike_id}
                                 position={[bike.lat, bike.lon]}>
        <Popup>
          <p>
            Bike ID: {bike.bike_id} <br />
            Disabled: {bike.is_disabled ? 'yes' : 'no'} <br />
            Reserved: {bike.is_reserved ? 'yes' : 'no'}
          </p>
        </Popup>
      </Marker>)}
    </MapContainer>
  );
};

export default Bikes;
