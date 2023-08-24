import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Category, Featured } from './types';

const dynamoDb = new DynamoDB.DocumentClient();

const categoriesTable = process.env.CATEGORIES_TABLE_NAME;
const featuredTable = process.env.FEATURED_TABLE_NAME;

if (!categoriesTable || !featuredTable) {
    throw new Error('Table names not set');
}

const categoriesParams: DocumentClient.ScanInput = {
    TableName: categoriesTable,
};

const featuredParams: DocumentClient.ScanInput = {
    TableName: featuredTable,
};

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {


    if (event.path === "/categories" && event.httpMethod === "GET") {
        getCategories();
    }


    if (event.path === "/featured" && event.httpMethod === "GET") {
        getFeatured();
    }

    const response = composeResponse(404, { message: "No resources available" });
    return response;
};


//Utility functions:
function composeResponse(statusCode: number, body: any) {
    return {
        statusCode,
        body: JSON.stringify(body),
    };
}

async function getCategories() {
    const categoriesResult = await dynamoDb.scan(categoriesParams).promise();
    const categories = categoriesResult.Items as Category[];

    if (!categories.length) {
        const response = composeResponse(404, { message: "No categories found" });
        return response;
    }

    const translatedCategories = categories.map((category) => {
        return {
            id: category.N.id,
            name: category.S.name,
            image: category.S.image,
        };
    });

    const response = composeResponse(200, { translatedCategories });
    return response;
}

async function getFeatured() {
    const featuredResult = await dynamoDb.scan(featuredParams).promise();
    const featured = featuredResult.Items as Featured[];

    if (!featured.length) {
        const response = composeResponse(404, { message: "No featured items found" });
        return response;
    }
    const response = composeResponse(200, { featured });
    return response;
}