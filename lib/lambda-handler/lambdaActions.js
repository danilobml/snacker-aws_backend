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

async function getAllDishes() {
  const res = await dynamodb
    .scan({
      TableName: process.env.DISHES_TABLE_NAME,
    })
    .promise();
  const items = res.Items.map((dish) => translateDish(dish));
  return items;
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

async function getAllFeaturedItems() {
  const res = await dynamodb
    .scan({
      TableName: process.env.FEATURED_TABLE_NAME,
    })
    .promise();

  const items = res.Items.map((item) => translateFeatured(item));

  return items;
}


module.exports = {
  getAllCategories,
  getAllDishes,
  getAllRestaurants,
  getAllFeaturedItems,
};
