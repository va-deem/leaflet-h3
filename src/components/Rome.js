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
  h3ToGeoBoundary, compact, geoToH3, h3GetResolution
} from "h3-js";
import { zones } from '../data/zones';

const revertCoords = (coords) => coords.map(item => [item[1], item[0]]);

const coordinates = zones.rome;
const mapCenter = revertCoords(coordinates[0]).pop();

const Rome = ({ res, treshold }) => {
  const hexagons = polyfill(coordinates[0], +res, true);
  const [allHexagons, setAllHexagons] = useState(hexagons);

  // Used to render layer of polufilled hexagons
  const coordsPolyfilled = hexagons.map(a => h3ToGeoBoundary(a));

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
        const newHexH3Index = geoToH3(e.latlng.lat, e.latlng.lng, res);

        const isInside = allHexagons.includes(newHexH3Index);
        const isParentInside = allHexagons.includes(h3ToParent(newHexH3Index, res - 1));

        // Do not allow add new hexes inside existing parents with res-1
        if (isParentInside) return;

        if (isInside) {
          // Remove hex if it is on the map
          setAllHexagons(allHexagons.filter(hex => hex !== newHexH3Index));
        } else {
          // Add new
          setAllHexagons([...allHexagons, newHexH3Index]);
        }
      }
    });
    return null;
  };


  // Render compacted hexes for each resolution
  const renderCompactedCoords = (hexagonsArray) => {
    const uniqueResolutions = [...new Set(hexagonsArray.map(h => h3GetResolution(h)))];

    return uniqueResolutions.map(res => {
      const compacted = compact(allHexagons.filter(h => h3GetResolution(h) === res));
      const coordsCompacted = compacted.map((item, index) => ({
        id: index,
        coords: h3ToGeoBoundary(item)
      }));

      return coordsCompacted.map(el => <Polygon key={el.id}
                                                pathOptions={{ color: "green" }}
                                                positions={el.coords} />);
    });
  };

  return (
    <MapContainer center={mapCenter} zoom={12}
                  scrollWheelZoom={true}>
      <LocationMarker />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Map">
          <LayerGroup>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polygon positions={revertCoords(coordinates[0])} />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.Overlay checked name="Parents">
          <Polygon pathOptions={{color: "red"}}
                   positions={results.map(r => r.coords)} />)}
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Compact">
          <LayerGroup>
            {renderCompactedCoords(allHexagons)}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Polyfill">
          <Polygon pathOptions={{ color: "brown" }}
                   positions={coordsPolyfilled} />
        </LayersControl.Overlay>

      </LayersControl>
    </MapContainer>
  );
};

export default Rome;
