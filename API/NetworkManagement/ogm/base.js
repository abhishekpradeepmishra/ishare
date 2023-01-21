'use strict';

const gremlin = require('gremlin');
const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const NEPTUNE_ENDPOINT = process.env.neptune_endpoint;
const NEPTUNE_PORT = process.env.neptune_port;

class Base {
    constructor(type) {
        this.type = type;
        this.g = traversal().withRemote(new DriverRemoteConnection(`wss://ishare-neptune.cluster-ro-cwb1wxq3unmu.us-east-2.neptune.amazonaws.com:8182/gremlin`));
    }
}

module.exports = Base;

