import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import {
  ManagedPolicy,
  PolicyDocument,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import * as fs from "fs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IamStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Read the policy document from a JSON file
    const policyJson = fs.readFileSync("candidate-policy.json", "utf8");
    const policyDocument = PolicyDocument.fromJson(JSON.parse(policyJson));

    let role = new Role(this, "MyAwesomeRole", {
      assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
      inlinePolicies: {
        myPolicy: policyDocument,
      },
    });
  }
}
