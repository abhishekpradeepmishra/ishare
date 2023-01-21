
let response;
const AWS = require('aws-sdk');

const TABLE_NAME = process.env.TABLE_NAME;
//const APIGW_ENDPOINT = process.env.APIGW_ENDPOINT;
const APIGW_ENDPOINT = '381qa8qge5.execute-api.us-east-2.amazonaws.com/Prod/';
const REGION = 'us-east-2';


const s3 = new AWS.S3({region: process.env.AWS_REGION});
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });


exports.lambdaHandler = async (event, context) => {
        console.log("event: " + JSON.stringify(event));

        Message = JSON.parse(JSON.stringify(event.Records[0].Sns.Message));
        console.log("Message: " + Message);

        jsonParsedObj = JSON.parse(Message);
        console.log("NewImage: " + JSON.stringify(jsonParsedObj.dynamodb.NewImage).replace(/\"/g,''));

        username = JSON.stringify(jsonParsedObj.dynamodb.NewImage.by.S).replace(/\"/g,'');
        action = JSON.stringify(jsonParsedObj.dynamodb.NewImage.action.S).replace(/\"/g,'');
        entity = JSON.stringify(jsonParsedObj.dynamodb.NewImage.entity.S).replace(/\"/g,'');
        timestamp = JSON.stringify(jsonParsedObj.dynamodb.ApproximateCreationDateTime).replace(/\"/g,'');
        entitytypekey = JSON.stringify(jsonParsedObj.dynamodb.NewImage.entity.S).replace(/\"/g,'').substring(0, 1);

        console.log("username: " + username);
        console.log("action: " + action);
        console.log("timestamp: " + timestamp);
        console.log("entity: " + entity);
        console.log("entitytypekey: " + entitytypekey);

        let entityTypeMap = new Map()
        entityTypeMap['p'] = 'post';
        entityTypeMap['c'] = 'comment';
        entityTypeMap['u'] = 'user';
        entityTypeMap['x'] = 'ignore';

        entitytype = entityTypeMap[entitytypekey];
        console.log("entitytype: " + entitytype);

        let notificationParams = {
            username: username,
            action: action,
            entitytype: entitytype,
            entity: entity,
            timestamp: timestamp,
        }

        console.log("Message: " + JSON.stringify(notificationParams));
        console.log("APIGW_ENDPOINT: " + APIGW_ENDPOINT);
        console.log("TABLE_NAME: " + TABLE_NAME);

        try {
            connectionData = await ddb.scan({ TableName: TABLE_NAME, ProjectionExpression: 'connectionId' }).promise();
          } catch (e) {
            console.log(e.stack);
            return { statusCode: 500, body: e.stack };
          }
        
          //console.log("CONNECTIONID: " + connectionData);
          
          const apigwManagementApi = new AWS.ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: APIGW_ENDPOINT,
            region: process.env.AWS_REGION,
          });
          
          
          const postCalls = connectionData.Items.map(async ({ connectionId }) => {
            try {
              await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: JSON.stringify(notificationParams) }).promise();
            } catch (e) {
              if (e.statusCode === 410) {
                console.log(`Found stale connection, deleting ${connectionId}`);
                await ddb.delete({ TableName: TABLE_NAME, Key: { connectionId } }).promise();
              } else {
                throw e;
              }
            }
          });
          
          try {
            await Promise.all(postCalls);
          } catch (e) {
            console.log(e.stack);
            return { statusCode: 500, body: e.stack };
          }
        
          return { statusCode: 200, body: 'Data sent.' };
};
