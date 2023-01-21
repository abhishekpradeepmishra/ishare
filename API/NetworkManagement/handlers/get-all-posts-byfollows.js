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

    var response = p.getPostsByUsersIFollow();
    var data = [];
    response.then(posts => {
        // posts.map(post => {
        //     data.push(post.get("id"));
        // })
        
        // console.log(JSON.stringify(data))

        resolve({
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(posts),
            "isBase64Encoded": false
        })
    })
}
