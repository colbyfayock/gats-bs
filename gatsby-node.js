const path = require('path');
const parameterize = require('parameterize')

const createRestaurantError = 'Could not create post pages';

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const restaurantTemplate = path.resolve(`./src/templates/restaurant.js`);

  const { data, errors } = await graphql(`
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
  `);

  if (errors) throw errors;

  const { restaurants } = data.gcms || {};

  if ( !Array.isArray(restaurants) ) {
    throw new Error(`${createRestaurantError}: Invalid restaurants`);
  }

  restaurants.forEach(({ id, name }) => {
    const slug = parameterize(name);
    createPage({
      path: `/${slug}/`,
      component: restaurantTemplate,
      context: {
        id,
        slug
      }
    });
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `SitePage`) {
    const slug = node.context && node.context.slug;

    if ( !slug ) return;

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
}