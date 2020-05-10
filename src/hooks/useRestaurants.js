import { graphql, useStaticQuery } from 'gatsby';
import parameterize from 'parameterize';

export default function useRestaurants() {

  const { gcms = {} } = useStaticQuery(graphql`
    query {
      gcms {
        restaurants {
          address
          hours
          delivery
          phoneNumber
          name
          id
          location {
            latitude
            longitude
          }
          photo {
            url
            width
            height
          }
        }
      }
    }
  `)

  let { restaurants } = gcms;

  restaurants = restaurants.map(restaurant => {
    return {
      ...restaurant,
      path: `/${parameterize(restaurant?.name)}/`
    }
  })

  return {
    restaurants
  };

}