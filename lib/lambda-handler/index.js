const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event, context) => {
    if (event.path === "/categories" && event.httpMethod === "GET") {
        const categories = await getCategories();

        if (!categories.length) {
            const response = composeResponse(404, { message: "No categories found" });
            return response;
        }

        const response = composeResponse(200, { categories });
        return response;
    }

    if (event.path === "/featured" && event.httpMethod === "GET") {
        const featured = await getFeatured();

        if (!featured.length) {
            const response = composeResponse(404, { message: "No featured items found" });
            return response;
        }
        const response = composeResponse(200, { featured });
        return response;
    }
};

//Util functions:
async function getCategories() {
    const res = await dynamodb
    .scan({
        TableName: process.env.CATEGORIES_TABLE_NAME,
    })
    .promise();

    const items = res.Items.map((item) => {
        return {
        id: item.id.N,
        name: item.name.S,
        image: item.image.S,
        };
    });
    return items;
}

async function getFeatured() {
    const res = await dynamodb
    .scan({
        TableName: process.env.FEATURED_TABLE_NAME,
    })
    .promise();

    const items = res.Items;
    return items;
}

function composeResponse(statusCode, body) {
    return {
        statusCode,
        body: JSON.stringify(body),
    };
}
