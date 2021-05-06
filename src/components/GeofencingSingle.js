import React from 'react';
import { MapContainer, Polygon, TileLayer } from 'react-leaflet';

const coordinates = [
  [
    [
      [
        12.3476421,
        41.7020402
      ],
      [
        12.3376256,
        41.7070723
      ],
      [
        12.3226438,
        41.7128514
      ],
      [
        12.3181964,
        41.7150738
      ],
      [
        12.3173884,
        41.7159284
      ],
      [
        12.3067953,
        41.7213635
      ],
      [
        12.2979891,
        41.7248975
      ],
      [
        12.2973239,
        41.7255541
      ],
      [
        12.2933983,
        41.732601
      ],
      [
        12.291376,
        41.7349229
      ],
      [
        12.2826097,
        41.737633
      ],
      [
        12.278585,
        41.7388739
      ],
      [
        12.2771358,
        41.7390059
      ],
      [
        12.2688945,
        41.7371564
      ],
      [
        12.26649284362793,
        41.732571909582575
      ],
      [
        12.2761841,
        41.729267
      ],
      [
        12.2850676,
        41.7263204
      ],
      [
        12.2860117,
        41.7255196
      ],
      [
        12.2930498,
        41.7228611
      ],
      [
        12.3037787,
        41.7184407
      ],
      [
        12.3094006,
        41.7165508
      ],
      [
        12.3144646,
        41.7151092
      ],
      [
        12.3455393,
        41.7001977
      ],
      [
        12.3476421,
        41.7020402
      ],
      [
        12.3476421,
        41.7020402
      ],
      [
        12.3476421,
        41.7020402
      ]
    ]
  ]
];

const revertCoords = (coords) => coords[0][0].map(item => [item[1], item[0]]);

const GeofencingSingle = () => {
  const purpleOptions = { color: 'red' };

  return (
    <MapContainer center={[41.729267, 12.3226438]} zoom={14}
                  scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polygon pathOptions={purpleOptions}
               positions={revertCoords(coordinates)} />)}
    </MapContainer>
  );
};

export default GeofencingSingle;
