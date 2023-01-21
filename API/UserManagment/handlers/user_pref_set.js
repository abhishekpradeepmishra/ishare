const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });

exports.lambdaHandler = async(event, context) => {
    let data
    var params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            "userid": { S: event.user_id },
            "action": { S: 'config' }
        },
        AttributeUpdates: {
            "tags": { SS: event.config },
            Action: "PUT"
        }
    }

    try {
        data = await ddb.update(params).promise()
    }
    catch (e) {
        return { statusCode: 500, body: e.stack }
    }
    return { statusCode: 200 }
}
