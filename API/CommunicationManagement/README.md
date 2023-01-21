# Communication Management 

Communication Management provides capability to managing all kind of outcoming messaging channels like sms, email and push notifications.

Communication Managment has these high level Workflows:

1. Send SMS based notification
2. Send SMS based notification
3. Send Mobile Push based notifications


End to end implementation of Communication Management services will be done part of the lab

Steps:

1. Setup an Elasticache table or DynamoDb table store notifications
2. Create an API to write data into the table
3. Create API to read data from the table by taking userid as parameter


reference: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/elasticache-use-cases.html#elasticache-for-redis-use-cases-messaging

Create redis channel for:

1. preferences
2. each user 

Whenever there is a new post, tagged, a message is sent to preference channel with payload {
    postid: "postid"
}

Whenever there is a like or comment on a post, a message is sent to user channel with payload {
    action: "Like|Post",
    who: "usename",
    commentText: ""
}

Base on user connection, system can generate recommendations for post which his connections have made

The application receives the message and parses and converts it into notification/alerts to be sent to notification pane

