const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();

const {
  translateCategory,
  translateDish,
  translateRestaurant,
  translateFeatured,
} = require("./utils");

async function getAllCategories() {
  const res = await dynamodb
    .scan({
      TableName: process.env.CATEGORIES_TABLE_NAME,
    })
    .promise();
  const items = res.Items.map((category) => translateCategory(category));
  return items;
}

async function createCategory(id, name, image) {
  const res = await dynamodb
    .putItem({
      TableName: process.env.CATEGORIES_TABLE_NAME,
      Item: {
        id: {
          N: id,
        },
        name: {
          S: name,
        },
        image: {
          S: image,
        },
      },
      ReturnValues: "ALL_OLD",
    })
    .promise();
return res;
}

async function getAllDishes() {
  const res = await dynamodb
    .scan({
      TableName: process.env.DISHES_TABLE_NAME,
    })
    .promise();
  const items = res.Items.map((dish) => translateDish(dish));
  return items;
}

async function createDish(id, name, description, image, price, restaurantId) {
  const res = await dynamodb
    .putItem({
      TableName: process.env.DISHES_TABLE_NAME,
      Item: {
        id: {
          N: id,
        },
        name: {
          S: name,
        },
        description: {
          S: description,
        },
        image: {
          S: image,
        },
        price: {
          N: price,
        },
        restaurantId: {
          N: restaurantId,
        }
      },
      ReturnValues: "ALL_OLD",
    })
    .promise();
return res;
}

async function getAllRestaurants() {
  const res = await dynamodb
    .scan({
      TableName: process.env.RESTAURANTS_TABLE_NAME,
    })
    .promise();
  const items = res.Items.map((restaurant) => translateRestaurant(restaurant));
  return items;
}

async function createRestaurant(id, name, description, image, lat, lng, address, categoryId, deliveryFee) {
  const res = await dynamodb
    .putItem({

      TableName: process.env.RESTAURANTS_TABLE_NAME,
      Item: {
        id: {
          N: id,
        },
        name: {
          S: name,
        },
        description: {
          S: description,
        },
        image: {
          S: image,
        },
        lat: {
          N: lat,
        },
        lng: {
          N: lng,
        },
        address: {
          S: address,
        },
        rating: {
          N: '0',
        },
        reviews: {
          N: '0',
        },
        categoryId: {
          N: categoryId,
        },
        dishes: {
          L: [],
        },
        deliveryFee: {
          N: deliveryFee,
        },
      },
      ReturnValues: "ALL_OLD",
    })
    .promise();
return res;
}

async function getAllFeaturedItems() {
  const res = await dynamodb
    .scan({
      TableName: process.env.FEATURED_TABLE_NAME,
    })
    .promise();
  const items = res.Items.map((item) => translateFeatured(item));
  return items;
}

async function createFeaturedItem(id, title, description, restaurants) {
  const res = await dynamodb
    .putItem({
      TableName: process.env.FEATURED_TABLE_NAME,
      Item: {
        id: {
          N: id,
        },
        title: {
          S: title,
        },
        description: {
          S: description,
        },
        restaurants: {
          L: restaurants.map((restaurant) => ({ N: restaurant })),
        },
      },
      ReturnValues: "ALL_OLD",
    })
    .promise();
return res;
}


module.exports = {
  getAllCategories,
  createCategory,
  getAllDishes,
  createDish,
  getAllRestaurants,
  createRestaurant,
  getAllFeaturedItems,
  createFeaturedItem,
};
