const cdk = require('@aws-cdk/core');
const ec2 = require('@aws-cdk/aws-ec2');
const cloud9 = require('@aws-cdk/aws-cloud9');
const cognito = require('@aws-cdk/aws-cognito');
const { Duration, CfnOutput } = require('@aws-cdk/core');

class CdkStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    props.env = {
      region: "<AWSRegion",
      account: "<AWSAccountId>"
    }
    
    super(scope, id, props);

    // The code that defines your stack goes here
    createParams(this)
    const vpc = createVpc(this);
    createC9Instance(this, vpc);
    createUserPool(this);
  }
}

function createUserPool(stackref) {
  const ishareUserPool = new cognito.UserPool(stackref, "ishareuserpool", {
    accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    selfSignUpEnabled: true,
    autoVerify: {
      email: true
    },
    passwordPolicy: {
      minLength: 6,
      requireDigits: false,
      requireLowercase: false,
      requireUppercase: false,
      tempPasswordValidity: Duration.days(1)
    },
    standardAttributes: {
      email:true
    }
  })

  const ishareUserPoolClient = new cognito.UserPoolClient(stackref, "ishareuserpoolclient", {
    userPool: ishareUserPool,
    accessTokenValidity: Duration.minutes(10),
    authFlows: {
      adminUserPassword: true,
      custom: true,
      userPassword: true,
      userSrp: true
    },
    idTokenValidity: Duration.minutes(10),
    preventUserExistenceErrors: true,
    refreshTokenValidity: Duration.hours(1)
  })

  new cdk.CfnOutput(stackref, "userpoolid", {
    value: ishareUserPool.userPoolId
  })

  new cdk.CfnOutput(stackref, "userpoolclientid", {
    value: ishareUserPoolClient.userPoolClientId
  })
}

function createC9Instance(stackref, vpc) {
  const c9env = new cloud9.Ec2Environment(stackref, 'ishare-DevCloud9Instance', {
    vpc,
    subnetSelection: {
      subnetType: ec2.SubnetType.PUBLIC
    },
    instanceType: "t3.medium"
  });
}

function createParams(stackref) {
  const eekeyPair = new cdk.CfnParameter(stackref, "EEKeyPair", {
    type: "String",
    default: "EEKeyPair",
    description: "Event Engine Name of the EC2 KeyPair generated for the Team"
  });

  const lastestAMI = new cdk.CfnParameter(stackref, "LatestAMI", {
    type: "AWS::SSM::Parameter::Value<AWS::EC2::Image::Id>",
    default: "/aws/service/ami-windows-latest/Windows_Server-2019-English-Full-Base",
    description: "Latest AMI from windows"
  });
}

function createVpc(stackref) {
  const vpc = new ec2.Vpc(stackref, 'ishare-vpc', {
    cidr: "10.0.0.0/16",
    maxAzs: 3,
    natGateways: 1,
    enableDnsSupport: true,
    enableDnsHostnames: true,
    subnetConfiguration: [
      {
        cidrMask: 24,
        name: 'public',
        subnetType: ec2.SubnetType.PUBLIC,
      },
      {
        cidrMask: 24,
        name: 'private-nat',
        subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
      },
      {
        cidrMask: 24,
        name: 'private',
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      }
    ]
  })

  return vpc;
}

module.exports = { CdkStack }
