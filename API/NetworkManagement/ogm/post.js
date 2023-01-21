'use strict';

const gremlin = require('gremlin');
const Base = require('./base');
const { t: { id } } = gremlin.process;
const { cardinality: { single } } = gremlin.process;
const __ = gremlin.process.statics;

class Post extends Base {
    constructor(postid,userid,posttype, url) {
        super("post");
        
        this.postid = postid;
        this.userid = userid;
        this.posttype = posttype;
        this.url = url;
    }

    get id() {
        return this.postid;
    }

    async save() {
        try {
            const vertex = await this.g.addV('post')
                .property(id, this.postid)
                .property("id", this.postid)
                .as("post").addE('created').from_(__.V(this.userid)).to("post")
                .next();

            //return a promise, the invoker code has to wait for this to resolve and then take action
            return vertex.value;
        }
        catch (ex) {
            console.log("error occured while adding Person: " + ex);
            throw ex;
        }
    }
}


module.exports = Post;