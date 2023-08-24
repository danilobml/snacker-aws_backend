const {
  getAllCategories,
  getAllDishes,
  getAllRestaurants,
  getAllFeaturedItems,
} = require("./lambdaActions");

const { composeResponse } = require("./utils");

exports.handler = async (event, context) => {
  if (event.path === "/categories" && event.httpMethod === "GET") {
    const categories = await getAllCategories();
    if (!categories.length) {
      const response = composeResponse(404, { message: "No categories found" });
      return response;
    }
    const response = composeResponse(200, { categories });
    return response;
  }

  if (event.path === "/dishes" && event.httpMethod === "GET") {
    const dishes = await getAllDishes();
    if (!dishes.length) {
      const response = composeResponse(404, { message: "No dishes found" });
      return response;
    }
    const response = composeResponse(200, { dishes });
    return response;
  }

  if (event.path === "/restaurants" && event.httpMethod === "GET") {
    const restaurants = await getAllRestaurants();
    if (!restaurants.length) {
      const response = composeResponse(404, {
        message: "No restaurants found",
      });
      return response;
    }
    const response = composeResponse(200, { restaurants });
    return response;
  }

  if (event.path === "/featured" && event.httpMethod === "GET") {
    const featured = await getAllFeaturedItems();
    if (!featured.length) {
      const response = composeResponse(404, {
        message: "No featured items found",
      });
      return response;
    }
    const response = composeResponse(200, { featured });
    return response;
  }

  return composeResponse(404, { message: "Not found" });
};
