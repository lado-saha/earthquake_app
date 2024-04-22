//in server/elasticsearch/client.js
const { Client } = require("@elastic/elasticsearch");
const config = require("../../config/default.json");

const elasticConfig = config.elastic

const client = new Client({
  node: elasticConfig.protocol + "://" + elasticConfig.host + ":" + elasticConfig.port,
});

client
  .ping()
  .then((response) => console.log("You are connected to Elasticsearch!"))
  .catch((error) => console.error("error"));

module.exports = client;
