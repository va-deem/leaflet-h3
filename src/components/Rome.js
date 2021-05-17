import React, { useState } from 'react';
import {
  MapContainer,
  Polygon,
  TileLayer,
  LayersControl,
  LayerGroup,
  useMapEvents,
} from 'react-leaflet';
import {
  polyfill,
  h3ToParent,
  h3ToGeoBoundary, compact, geoToH3
} from "h3-js";
import { zones } from '../data/zones'

const revertCoords = (coords) => coords.map(item => [item[1], item[0]]);

const coordinates = zones.rome;
const mapCenter = revertCoords(coordinates[0]).pop();

const Rome = ({ res, treshold }) => {
  const hexagons = polyfill(coordinates[0], +res || 9, true);

  const [allHexagons, setAllHexagons] = useState(hexagons);

  const colorRed = { color: 'red' };
  const colorBlue = { color: 'blue' };
  const colorGreen = { color: 'green' };
  const colorBrown = { color: 'brown' };

  const polyfillResults = allHexagons.map(a => h3ToGeoBoundary(a));

  const compacted = compact(allHexagons);
  const coordsCompacted2 = compacted.map((item, index) => ({
    id: index,
    coords: h3ToGeoBoundary(item)
  }));

  const replaceWithParents = (hexagonsArr, treshold, res) => {
    const parentRes = res - 1; // coarser resolution than hexagons

    // The hexagons with their parents
    const hexWithParents = hexagonsArr.map(hex => ({
      hexagon: hex,
      parent: h3ToParent(hex, parentRes)
    }));

    // Array of unique parents
    const uniqueParents = [...new Set(hexWithParents.map(hex => hex.parent))];

    // Get all childen of every parent
    const parentWithChildren = [];
    for (let i = 0; i < uniqueParents.length; i += 1) {
      const children = hexWithParents.reduce((acc, item) => {
        if (item.parent === uniqueParents[i]) {
          acc.push(item.hexagon);
        }
        return acc;
      }, []);

      parentWithChildren.push({
        parent: uniqueParents[i],
        childrenCount: children.length
      });
    }

    // Find parents only with childrenCount >= treshold
    const filtered = parentWithChildren.filter(item => item.childrenCount >= treshold);

    // Return h3Indices converted to coordinates
    return filtered.map((item, index) => ({
      id: index,
      coords: h3ToGeoBoundary(item.parent)
    }));
  };

  const results = replaceWithParents(allHexagons, treshold, res);

  const LocationMarker = () => {
    useMapEvents({
      click: (e) => {
        const newHex = getH3PolygonIndex(e.latlng);
        if (!allHexagons.includes(newHex)) {
          setAllHexagons([...allHexagons, newHex]);
        } else {
          setAllHexagons(allHexagons.filter(hex => hex !== newHex));
        }
      }
    });
    return null;
  };

  const getH3PolygonIndex = (currentCoords) => {
    return geoToH3(currentCoords.lat, currentCoords.lng, res);
  };

  return (
    <MapContainer center={mapCenter} zoom={14}
                  scrollWheelZoom={true}>
      <LocationMarker />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Map">
          <LayerGroup>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polygon pathOptions={colorBlue}
                     positions={revertCoords(coordinates[0])} />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.Overlay checked name="Parents">
          <Polygon pathOptions={colorRed}
                   positions={results.map(r => r.coords)} />)}
          {/*{results.map(result => <Polygon key={result.id} pathOptions={colorRed}*/}
          {/*                                positions={result.coords} />)}*/}
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Compact">
          <LayerGroup>
            {/*<Polygon pathOptions={colorGreen} positions={coordsCompacted} />*/}
            {coordsCompacted2.map(el => <Polygon key={el.id}
                                                 pathOptions={colorGreen}
                                                 positions={el.coords} />)}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Polyfill">
          <Polygon pathOptions={colorBrown} positions={polyfillResults} />
        </LayersControl.Overlay>

      </LayersControl>
    </MapContainer>
  );
};

export default Rome;
