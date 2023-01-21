const Person = require('../ogm/person');
const Post = require('../ogm/post');

exports.handler = async(event, context) => {
    const promise = new Promise(function(resolve, reject) {

        try {
            console.log(JSON.stringify(event));
            var requestbody = JSON.parse(event.body);
           // var user = requestbody.user;
           var user = event.pathParameters.user;
           
            getfromStore(user, resolve);
        }
        catch (err) {
            console.log(err);
            reject(Error(e))
        }
    })

    return promise;
}


function getfromStore(user, resolve) {
    const p = new Person(user);

    var response = p.getUserSummary();
    var data = [];
    response.then(response => {
        
        var usersummary = {
            "followers": response?.value.get("followers"),
            "follows": response?.value.get("follows"),
            "posts": response?.value.get("posts")
        }

        resolve({
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(usersummary),
            "isBase64Encoded": false
        })
    })
}
