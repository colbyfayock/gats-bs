import React from 'react';
import { Helmet } from 'react-helmet';
import { Marker } from 'react-leaflet';

import { useRestaurant } from 'hooks';
import { returnsToBr, formatPhone } from 'lib/util';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';

const TemplateRestaurant = ({ pageContext }) => {
  const { restaurant } = useRestaurant({
    byId: pageContext?.id
  });

  const { name, location, address, delivery, hours, phoneNumber, photo } = restaurant;
  const center = [location?.latitude, location?.longitude];
console.log('restaurant', restaurant)
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   */

  function mapEffect({ leafletElement: map } = {}) {
    if ( !map ) return;

  }

  const mapSettings = {
    center,
    zoom: 18,
    defaultBaseMap: 'Mapbox',
    mapEffect
  };

  return (
    <Layout pageName="restaurant">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className="restaurant-hero" style={{
        backgroundImage: `url(${photo?.url})`
      }}>
        <h1>{ name }</h1>
      </div>
      <Container type="content">
        <div className="restaurant-info">
          <h2>Address</h2>
          <address dangerouslySetInnerHTML={{
            __html: returnsToBr(address)
          }} />
          <h2>Phone Number</h2>
          <p>
            {formatPhone(phoneNumber)}
          </p>
          <h2>Hours</h2>
          <p dangerouslySetInnerHTML={{
            __html: returnsToBr(hours)
          }} />
          <h2>More Info</h2>
          <ul>
            <li>
              Delivery: {delivery ? 'Yes' : 'No'}
            </li>
          </ul>
        </div>
        <Map {...mapSettings}>
          <Marker position={center} />
        </Map>
      </Container>
    </Layout>
  );
}

export default TemplateRestaurant;