'use strict';

const gremlin = require('gremlin');
const Base = require('./base');
const { t: { id } } = gremlin.process;
const { cardinality: { single } } = gremlin.process;
const __ = gremlin.process.statics;

class Person extends Base {
    constructor(userid, timestamp) {
        super("person");
        
        this.id = userid;
        this.timestamp = timestamp;
        //this.firstname = firstname;
        //this.lastname = lastname;
    }

    // get id() {
    //     return this.id;
    // }

    async likes(postid) {
        try {
            //const link = this.g.addE('likes').from_(__.V(this.id)).to(__.V(post.postid)).next();
            const link = this.g.addE('likes').from_(__.V(this.id)).to(__.V(postid)).next();

            return link;
        }
        catch (ex) {
            console.log("error linking comment to person: " + ex);
            throw ex;
        }
    }
    
    async follows(person) {
        try {
            const link = this.g.addE('follows').from_(__.V(this.id)).to(__.V(person.postid)).next();

            return link;
        }
        catch (ex) {
            console.log("error linking comment to person: " + ex);
            throw ex;
        }
    }
    
    async comments(postid) {
        try {
            const link = this.g.addE('comments').from_(__.V(this.id)).to(__.V(postid)).next();

            return link;
        }
        catch (ex) {
            console.log("error linking comment to person: " + ex);
            throw ex;
        }
    }
    
    async getPostsByUsersIFollow() {
        var id = this.id;
        const posts = this.g.V(id).outE("follows").inV().outE("created").inV().id().toList();
        
        return posts;
    }
        
    async getPostsFromMe() {
        var id = this.id;
        const posts = this.g.V(id).outE("created").inV().id().toList();
        
        return posts;
    }
    
    
    async getUserSummary() {
        var id = this.id;
        const posts = this.g.V(id).
        project("followers","follows","posts").
        by(__.out("follows").count()).
        by(__.in_("follows").count()).
        by(__.out("created").count()).
        next();
        
       // g.V("fab").project("followers","follows","posts").by(out("follows").count()).by(in("follows").count()).by(out("created").count())
        
        return posts;
    }


    async owns(post) {
        try {
            const link = this.g.addE('owns').from_(__.V(this.id)).to(__.V(post.postid)).next();

            return link;
        }
        catch (ex) {
            console.log("error linking comment to person: " + ex);
            throw ex;
        }
    }

    async save() {
        try {
            const vertex = await this.g.addV('person')
                .property(id, this.id)
                .property(single, 'timestamp', this.timestamp)
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


module.exports = Person;
