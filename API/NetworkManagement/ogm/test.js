//This is sample implementation to seed sample values in graph db

const Person = require('./person');
const Post = require('./post');

const personseed = [{
        firstname: "firstname1",
        lastname: "lastname1",
        email: "user1@domain.com"
    },
    {
        firstname: "firstname2",
        lastname: "lastname2",
        email: "user2@domain.com"
    },
    {
        firstname: "firstname3",
        lastname: "lastname3",
        email: "user3@domain.com"
    },
    {
        firstname: "firstname4",
        lastname: "lastname4",
        email: "user4@domain.com"
    },
    {
        firstname: "firstname5",
        lastname: "lastname5",
        email: "user5@domain.com"
    }
];

const postseed = [{
        postid: "post1",
        posttype: "text",
        url: "https://aws.amazon.com/neptune/?c=db&sec=srv"
    },
    {
        postid: "post2",
        posttype: "text",
        url: "https://aws.amazon.com/neptune/?c=db&sec=srv"
    },
    {
        postid: "post3",
        posttype: "video",
        url: "https://www.youtube.com/watch?v=YmR2_zlQO5w"
    }
];

//write posts one by one

postseed.forEach(post => {
    let postObj = new Post(post.postid, post.posttype, post.url);
    let result = postObj.save();
    result.then(msg => console.log(msg));
});


//write person one by one

personseed.forEach(person => {
    let personObj = new Person(person.email, person.firstname, person.lastname);
    let result = personObj.save();
    result.then(msg => console.log(msg));
});


//write relationships between person and post
//user1 owns post1 and post2
//user2 owns post3
//user1,user3 likes post3
//user3,user4 likes post1
//user5,user3 likes post2

//add owns relationship from person to post

let person1 = new Person('user1@domain.com');
[postseed[0], postseed[1]].forEach(post => {
    var result = person1.owns(post);
    result.then(msg => console.log(msg));
});

let person2 = new Person('user2@domain.com');
[postseed[2]].forEach(post => {
    var result = person2.owns(post);
    result.then(msg => console.log(msg));
});

[personseed[0], personseed[2]].forEach(person => {
    var personObj = new Person(person.email);
    var result = personObj.likes(postseed[2]);
    result.then(msg => console.log(msg));
});

[personseed[2], personseed[3]].forEach(person => {
    var personObj = new Person(person.email);
    var result = personObj.likes(postseed[0]);
    result.then(msg => console.log(msg));
});

[personseed[4], personseed[2]].forEach(person => {
    var personObj = new Person(person.email);
    var result = personObj.likes(postseed[1]);
    result.then(msg => console.log(msg));
});
