const Person = require('../ogm/person');
/*
ddbEvent = {'Records': [{'eventID': '11e7f9d83e76a3a41f84010892891c8a', 'eventName': 'INSERT', 'eventVersion': '1.1', 'eventSource': 'aws:dynamodb', 'awsRegion': 'ap-southeast-2', 'dynamodb': {'ApproximateCreationDateTime': 1638417757.0, 'Keys': {'eventId': {'S': 'u1'}, 'LastUpdateDate': {'S': '1638417730'}}, 'NewImage': {'eventId': {'S': 'u1'}, 'action': {'S': 'bio'}, 'prefname': {'S': 'KuetTai'}, 'email': {'S': 'yongkue+ishare@amazon.com'}, 'entity': {'S': 'u001'}, 'LastUpdateDate': {'S': '1638417730'}}, 'SequenceNumber': '1800000000005481797069', 'SizeBytes': 130, 'StreamViewType': 'NEW_IMAGE'}, 'eventSourceARN': 'arn:aws:dynamodb:ap-southeast-2:956288449190:table/ishare/stream/2021-12-02T03:44:10.971'}]}

ddbEvent.Records.forEach(function(record) {
        console.log('Event ID:', record.eventID);
        console.log('Event Name:',record.eventName);
        let personEmail = record.dynamodb.NewImage.email.S;
        let personFname = "KuetTai";
        let personLname = "Yong";
        let postObj = new Person(personEmail, personFname, personLname); // hardcoded fname and lname
        let result = postObj.save();
        result.then(msg => console.log(msg));
    });
*/
exports.handler = async function(event, context) {
    // event will be SQS - need to parse SQS message body and get DDB event from there
  event.Records.forEach(record => {
    const { body } = record;
    console.log(body);
    
    const ddbEvent = JSON.parse(body);
    // adds the post to Neptune DB
    ddbEvent.Records.forEach(function(record) {
        //console.log('Event ID:', record.eventID);
        //console.log('Event Name:',record.eventName);
        let personEmail = record.dynamodb.NewImage.email.S;
        let personFname = "KuetTai";
        let personLname = "Yong";
        let postObj = new Person(personEmail, personFname, personLname); // hardcoded fname and lname
        let result = postObj.save();
        result.then(msg => console.log(msg));
    });
  });
 }