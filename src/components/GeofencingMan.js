import React from 'react';
import { MapContainer, Polygon, TileLayer } from 'react-leaflet';
import {
  polyfill,
  h3ToParent,
  h3ToGeoBoundary
} from "h3-js";

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
]
const GeofencingCompact = ({ res, treshold }) => {
  const purpleOptions = { color: 'red' };

  // Convert polygon to hexagons
  const hexagons = polyfill(coordinates[0], +res || 9, true);

  const replaceWithParents = (hexagonsArr, treshold, res) => {
    const parentRes = res - 1; // coarser resolution than hexagons

    // The hexagons with their parents
    const hexWithParents = hexagonsArr.map(hex => ({
      hexagon: hex,
      parent: h3ToParent(hex, parentRes )
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
    return filtered.map(item => h3ToGeoBoundary(item.parent));
  };

  const result = replaceWithParents(hexagons, treshold, res);

  return (
    <MapContainer center={[42.355143, -71.07476]} zoom={14}
                  scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon pathOptions={purpleOptions} positions={result} />)}
    </MapContainer>
  );
};

export default GeofencingCompact;
