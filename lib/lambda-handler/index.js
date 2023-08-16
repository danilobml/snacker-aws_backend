const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event, context) => {
  if (event.path === "/categories" && event.httpMethod === "GET") {
    const categories = await getCategories();

    if (!categories.length) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "No categories found",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        categories,
      }),
    };
  }

  if (event.path === "/featured" && event.httpMethod === "GET") {
    const featured = await getFeatured();

    if (!featured.length) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "No featured items found",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        featured,
      }),
    };
  }
};

//Util functions:
async function getCategories() {
  const categoriesTable = await dynamodb
    .scan({
      TableName: process.env.CATEGORIES_TABLE_NAME,
    })
    .promise();

  const items = categoriesTable.Items.map((item) => {
    return {
      id: item.id.N,
      name: item.name.S,
      image: item.image.S,
    };
  });

  return items;
}

async function getFeatured() {
  const featuredTable = await dynamodb
    .scan({
      TableName: process.env.FEATURED_TABLE_NAME,
    })
    .promise();

  const items = featuredTable.Items;
  return items;
}
