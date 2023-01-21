const Person = require('../ogm/person');
const Post = require('../ogm/post');

exports.handler = async (event, context) => {
    try {
        console.log(JSON.stringify(event));
        var requestbody = JSON.parse(event.body);
        var user = requestbody.user;
        console.log(user);
        
        response = {};
        response = getFormattedResponse(getfromStore(user));
        
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};

function getFormattedResponse(data){
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": JSON.stringify(data),
        "isBase64Encoded": false
    }
}

function getfromStore(user) {
   const p =  new Person(user);
   
   var response1 = p.getPostFromFollows();
   response1.then(posts => {
       posts.map(post => {
           console.log(post.get("id"));    
       })
   })
}