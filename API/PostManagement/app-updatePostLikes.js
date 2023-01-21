'use strict';

const fs = require('fs');
const config = require("./config");

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.handler = async (event, context) => {
    //TODO: When a like for a video is done, a notification is sent to the post owner saying your post was like by {user}
    try {

        console.log(JSON.stringify(event));

        var requestbody = JSON.parse(event.body);
        var post = requestbody.data;

        var isSaved = await saveToStore(post);

        response = {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(isSaved),
            "isBase64Encoded": false
        }

        console.log(JSON.stringify(event));

    } catch (err) {
        console.log(err);

        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": err.toString(),
            "isBase64Encoded": false
        };
    }

    return response;
};

function saveToStore(post) {

    return new Promise((resolve, reject) => {
        //make a call to underlying store here
        resolve(true);
    });
}
