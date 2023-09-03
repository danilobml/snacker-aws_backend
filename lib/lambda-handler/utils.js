function translateRestaurant(restaurant) {
  return {
    id: restaurant.id.N,
    image: restaurant.image.S,
    name: restaurant.name.S,
    description: restaurant.description.S,
    lat: restaurant.lat.N,
    lng: restaurant.lng.N,
    address: restaurant.address.S,
    rating: restaurant.rating.N,
    reviews: restaurant.reviews.N,
    categoryId: restaurant.categoryId.N,
    dishes: restaurant.dishes.L.map((dish) => dish.N),
    deliveryFee: restaurant.deliveryFee.N,
  };
}

function translateDish(dish) {
  return {
    id: dish.id.N,
    name: dish.name.S,
    description: dish.description.S,
    image: dish.image.S,
    price: dish.price.N,
  };
}

function translateCategory(category) {
  return {
    id: category.id.N,
    name: category.name.S,
    image: category.image.S,
  };
}

function translateFeatured(featuredItem) {
  return {
    id: featuredItem.id.N,
    title: featuredItem.title.S,
    description: featuredItem.description.S,
    restaurants: featuredItem.restaurants.L.map((restaurant) => restaurant.N),
  };
}

function composeResponse(statusCode, body) {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode,
    body: JSON.stringify(body),
  };
}

module.exports = {
    translateRestaurant,
    translateDish,
    translateCategory,
    translateFeatured,
    composeResponse,
};
