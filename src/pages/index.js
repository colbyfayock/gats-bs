import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';

import { useRestaurants } from 'hooks';

import Layout from 'components/Layout';
import Map from 'components/Map';
import Logo from 'components/Logo';

const LOCATION = {
  lat: 38.9072,
  lng: -77.0369,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;
const DEFAULT_BASEMAP = 'Mapbox';

const IndexPage = () => {
  const { restaurants } = useRestaurants();

  const restaurantsGeoJson = {
    type: 'FeatureCollection',
    features: restaurants.map(( restaurant = {}) => {
      const { location = {} } = restaurant;
      const { latitude, longitude } = location;
      return {
        type: 'Feature',
        properties: {
          ...restaurant,
        },
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      };
    }),
  };

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   */

  function mapEffect({ leafletElement: map } = {}) {
    if ( !map ) return;

    map.eachLayer(( layer ) => {
      const { options = {} } = layer;
      const { name } = options;
      if ( name === DEFAULT_BASEMAP ) return;
      map.removeLayer( layer );
    });

    const geoJson = new L.GeoJSON( restaurantsGeoJson );
    const geoJsonBounds = geoJson.getBounds();

    geoJson.addTo( map );

    map.fitBounds( geoJsonBounds );
    map.setZoom( map.getZoom() - 1 );
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: DEFAULT_BASEMAP,
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <div className="home-hero">
        <div className="home-hero-content">
          <h1>
            <Logo />
          </h1>
          <p>Your local family favorite resturant!</p>
          <p>
            <a href="#locations">
              <FaMapMarkerAlt />
              View Locations
            </a>
          </p>
        </div>
      </div>

      <Map {...mapSettings} />

      <div className="text-center home-locations">
        <h2 id="locations">Locations</h2>
        <ul>
          { restaurants.map(( restaurant ) => {
            const { id, name, path } = restaurant;
            return (
              <li key={id}>
                <Link to={path}>{ name }</Link>
              </li>
            );
          }) }
        </ul>
      </div>
    </Layout>
  );
};

export default IndexPage;
