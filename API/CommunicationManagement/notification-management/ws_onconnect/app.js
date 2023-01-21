// Copyright 2018-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require('aws-sdk');

//process.env.AWS_REGION = "us-east-1";
//process.env.TABLE_NAME = "camera_inventory";


const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });


exports.lambdaHandler = async event => {
  const putParams = {
    TableName: process.env.TABLE_NAME,
    Item: {
      connectionId: event.requestContext.connectionId
    }
  };

  connectionData = await ddb.scan({ TableName: process.env.TABLE_NAME, ProjectionExpression: 'cameraId, siteId' }).promise();
  //const postData = JSON.parse(event.body).data;

  try {
    await ddb.put(putParams).promise();
    console.log(connectionData.Items);
    //console.log("test");
  } catch (err) {
    return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(err) };
  }

  return { statusCode: 200, body: "Connected.." };
};
