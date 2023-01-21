const Post = require('../ogm/post');

// This function adds an entry to NeptuneDB from SNS-SQS-Lambda-Neptune
// Sample event: sns-sqs-event.json
// Event where a user posts a new post

exports.handler = async function(event, context) {
    // event will be SQS - need to parse SQS message body and get DDB event from there
  const promise = new Promise( function(resolve, reject) {
    console.log("Event:", event)
      event.Records.forEach(async record => {
        const { body } = record;
        console.log("Message body:",body) //type string
        
        let parsedJson = JSON.parse(body)
        let base64encoded = parsedJson.Message
        console.log("Base64 encoded:", base64encoded)
        
        let base64decoded = JSON.parse(Buffer.from(base64encoded,"base64").toString());
        console.log("Base64 decoded:", base64decoded)
        
        
        //let parsedJson = JSON.parse(JSON.parse(body)["Message"].replace(/\\\//g, ""));
        
        //console.log("Parsed Json:", parsedJson)
        //console.log(Object.keys(parsedJson))
        let postId = base64decoded["dynamodb"]["NewImage"]["entity"]["S"];
        let userId = base64decoded["dynamodb"]["NewImage"]["by"]["S"];
        var postUrl = null;
        try{
          postUrl = base64decoded["dynamodb"]["NewImage"]["img_key"]["S"];
        }
        
        catch(err){
          console.log(err)
          postUrl = "no url";
        }
        
        
        console.log("Post ID Entity:",postId)
        console.log("Post By:",userId)
        console.log("MediaURL:", postUrl)
        
        let postObj = new Post(postId, userId, "picture", postUrl); // hardcoded posttype
        let result = await postObj.save();
        console.log(result);
        resolve(result);

      });
    })
    return promise;
 }