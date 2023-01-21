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
    try {
        response = {};

        if (process.env.IsMockEnabled) {
            response = getMockPosts();
        } else {
            response = {};
            //make call to underlying store and get data  
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};

function getMockPosts() {
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": JSON.stringify(JSON.parse(fs.readFileSync('./data/posts.json'))),
        "isBase64Encoded": false
    }
}
