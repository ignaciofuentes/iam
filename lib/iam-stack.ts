import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { PolicyDocument, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import * as fs from "fs";
import * as path from "path";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IamStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Read the policy document from a JSON file
    var policyPath = path.join(__dirname, "../policies/candidate-policy.json");
    const policyJson = fs.readFileSync(policyPath, "utf8");
    const policyDocument = PolicyDocument.fromJson(JSON.parse(policyJson));

    let role = new Role(this, "MyAwesomeRole", {
      assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
      inlinePolicies: {
        myPolicy: policyDocument,
      },
    });
  }
}
