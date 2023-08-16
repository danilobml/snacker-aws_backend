#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SnackerAwsBackendStack } from '../lib/snacker-aws_backend-stack';

const app = new cdk.App();
new SnackerAwsBackendStack(app, 'SnackerAwsBackendStack', {});