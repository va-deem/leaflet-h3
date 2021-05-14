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

const revertCoords = (coords) => coords.map(item => [item[1], item[0]]);

const coordinates = [
  [
    [-71.069508, 42.335012],
    [-71.071819, 42.330531],
    [-71.078459, 42.32963],
    [-71.08279, 42.33321],
    [-71.08048, 42.337692],
    [-71.084811, 42.341273],
    [-71.091453, 42.340371],
    [-71.095785, 42.343951],
    [-71.093476, 42.348434],
    [-71.097809, 42.352015],
    [-71.0955, 42.356498],
    [-71.088856, 42.3574],
    [-71.086545, 42.361883],
    [-71.0799, 42.362784],
    [-71.077588, 42.367268],
    [-71.070943, 42.368169],
    [-71.06863, 42.372652],
    [-71.061983, 42.373552],
    [-71.05765, 42.36997],
    [-71.051004, 42.37087],
    [-71.046673, 42.367286],
    [-71.048988, 42.362804],
    [-71.044657, 42.359221],
    [-71.046972, 42.354739],
    [-71.053616, 42.353839],
    [-71.055929, 42.349358],
    [-71.051599, 42.345775],
    [-71.053913, 42.341294],
    [-71.060555, 42.340394],
    [-71.062867, 42.335913],
    [-71.069508, 42.335012]
  ]
];

const GeofencingMan = ({ res, treshold }) => {
  const hexagons = polyfill(coordinates[0], +res || 9, true);

  const [allHexagons, setAllHexagons] = useState(hexagons);

  const colorRed = { color: 'red' };
  const colorBlue = { color: 'blue' };
  const colorGreen = { color: 'green' };
  const colorBrown = { color: 'brown' };

  const polyfillResults = allHexagons.map(a => h3ToGeoBoundary(a));

  const compacted = compact(allHexagons);
  // const coordsCompacted = compacted.map(a => h3ToGeoBoundary(a));
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
    <MapContainer center={[42.355143, -71.07476]} zoom={14}
                  scrollWheelZoom={false}>
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

export default GeofencingMan;
