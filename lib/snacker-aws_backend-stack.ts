import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as path from 'path';

export class SnackerAwsBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const categoriesTable = new dynamodb.Table(this, 'CategoriesTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.NUMBER,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const featuredTable = new dynamodb.Table(this, 'FeaturedTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.NUMBER,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const lambdaFunction = new lambda.Function(this, 'SnackerLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      environment: {
        CATEGORIES_TABLE_NAME: categoriesTable.tableName,
        FEATURED_TABLE_NAME: featuredTable.tableName,
      },
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
    });

    categoriesTable.grantReadData(lambdaFunction);
    featuredTable.grantReadData(lambdaFunction);

    const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction);

    const snackerApi = new apigateway.RestApi(this, 'SnackerApi');
    const categoriesResource = snackerApi.root.addResource('categories');
    categoriesResource.addMethod('GET', lambdaIntegration);
    const featuredResource = snackerApi.root.addResource('featured');
    featuredResource.addMethod('GET', lambdaIntegration);

    // const key = snackerApi.addApiKey('ApiKey', {
    //   apiKeyName: 'snacker-api-key',
    // });

  }
}
