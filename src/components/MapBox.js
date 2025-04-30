import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoieXpoYTA0OTciLCJhIjoiY20wZDg2OXo5MGJuMTJpb3Jpd3kzZGpwbyJ9.krpIVomqpNj7Kt0BiHsLEA';

const MapBox = ({ points }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    let pointFeatures = points.map(item => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [item.long, item.lat]
        },
        properties: {
          
        }
      }
    })

    if (!map.current || !points.length) return
    const source = map.current.getSource('points');
      const data = source.serialize().data;
    const newData = {
      ...data,
      features: pointFeatures
    };
    source.setData(newData);
    
  }, [points])

  useEffect(() => {

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [145.135, -37.91], 
      zoom: 10,                    
    })

    map.current.on('load', async () => {
      map.current.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
          if (error) throw error;
          
          map.current.addImage('custom-marker', image);

          map.current.addSource('points', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: []
            }
          });
          
          map.current.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'points',
            layout: {
              'icon-image': 'custom-marker',
              'icon-size': 0.5,
              'text-field': ['get', 'title'],
              'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          });
        }
      );
    })

    return () => map.current.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }}></div>;
};

export default MapBox;
