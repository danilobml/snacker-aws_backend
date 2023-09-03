const {
  getAllCategories,
  createCategory,
  getAllDishes,
  createDish,
  getAllRestaurants,
  createRestaurant,
  getAllFeaturedItems,
  createFeaturedItem,
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

  if (event.path === "/categories" && event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    const { id, name, image } = body;
    if (!id || !name || !image) {
      const response = composeResponse(400, {
        message: "Missing required fields",
      });
      return response;
    }
    const category = await createCategory(id, name, image);
    console.log(category)
    const response = composeResponse(201, { message: "Category created" });
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

  if(event.path === "/dishes" && event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    const { id, name, description, image, price } = body;
    if (!id || !name || !description || !image || !price) {
      const response = composeResponse(400, {
        message: "Missing required fields",
      });
      return response;
    }
    const dish = await createDish(id, name, description, image, price);
    console.log(dish)
    const response = composeResponse(201, { message: "Dish created" });
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

  if(event.path === "/restaurants" && event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    const { id, name, description, image, lat, lng, address, categoryId, dishes, deliveryFee } = body;
    if (!id || !name || !description || !image || !lat || !lng || !address || !categoryId) {
      const response = composeResponse(400, {
        message: "Missing required fields",
      });
      return response;
    }
    const restaurant = await createRestaurant(id, name, description, image, lat, lng, address, categoryId, dishes=[], deliveryFee=0);
    console.log(restaurant)
    const response = composeResponse(201, { message: "Restaurant created" });
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

  if(event.path === "/featured" && event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    const { id, title, description, restaurants } = body;
    if (!id || !title || !description || !restaurants) {
      const response = composeResponse(400, {
        message: "Missing required fields",
      });
      return response;
    }
    const featured = await createFeaturedItem(id, title, description, restaurants=[]);
    console.log(featured)
    const response = composeResponse(201, { message: "Featured item created" });
    return response;
  }

  return composeResponse(404, { message: "Not found" });
};
