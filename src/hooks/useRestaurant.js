import { useRestaurants } from 'hooks';

export default function useRestaurant({ byId }) {
  const { restaurants } = useRestaurants();

  const restaurant = restaurants.find(({ id } = {}) => id === byId );

  return {
    restaurant,
  };
}
