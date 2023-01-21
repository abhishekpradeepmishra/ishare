const Post = require('../ogm/post');
const Person = require('../ogm/person');

exports.handler = async function(event, context) {
    // event will be SQS - need to parse SQS message body and get DDB event from there
  event.Records.forEach(record => {
    const { body } = record;
    let newBody = body.replace(/'/g, '"')
    const ddbEvent = JSON.parse(newBody);
    
    // adds the post to Neptune DB
    ddbEvent.Records.forEach(function(record) {
        //console.log('DynamoDB Record: %j', record.dynamodb);
        let postId = record.dynamodb.NewImage.entity.S;
        let userId = record.dynamodb.NewImage.by.S;
        let timestamp = record.dynamodb.ApproximateCreationDateTime;
        
        console.log('Post ID:', postId);
        console.log('User ID:', userId);
        console.log('Timestamp:', timestamp);
        // need the person object and call person.likes(postId)
        let user = new Person(userId,timestamp);
        let link = user.likes(postId);
        console.log(link)
        // do we need to do something like save()
        //let result = link.save();
        //result.then(msg => console.log(msg));
    });
  });
 }