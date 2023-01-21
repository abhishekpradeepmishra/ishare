'use strict';
var AWS = require("aws-sdk");
var sns = new AWS.SNS();

exports.lambdaHandler = (event, context, callback) => {

    console.log('Event record: ', JSON.stringify(event));

    event.Records.forEach((record) => {
        console.log('Stream record: ', JSON.stringify(record));
        //console.log('Stream record: ', JSON.stringify(record, null, 2));

        let base64String = Buffer.from(JSON.stringify(record), "utf8").toString("base64");
  
        console.log('Base64  record: ', base64String);

        if (record.eventName == 'INSERT') {
    //         var who = JSON.stringify(record.dynamodb.NewImage.Username.S);
    //         var when = JSON.stringify(record.dynamodb.NewImage.Timestamp.S);
    //         var what = JSON.stringify(record.dynamodb.NewImage.Message.S);

            var params = {
                 Subject: 'test',
                 //Message:  JSON.stringify(record),
                 Message:  base64String,
                 TopicArn: 'arn:aws:sns:us-east-2:148552580999:ishare-fanout'
            };

            //console.log('Params: ', JSON.stringify(params));

            sns.publish(params, function(err, data) {
                if (err) {
                    console.error("Unable to send message. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Data Sent: ", JSON.stringify(params));
                    console.log("Results from sending message: ", JSON.stringify(data, null, 2));
                    
                }
            });
        }
    });
    callback(null, `Successfully processed ${event.Records.length} records.`);
};