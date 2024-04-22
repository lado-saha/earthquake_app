//in server/create-api-key.js
const client = require('./elasticsearch/client');

async function generateApiKeys(opts) {
  // Create an API key directly without specifying an index
  const body = await client.security.createApiKey({
    method: 'POST',
    body: {
      name: 'earthquake_app',
      role_descriptors: {
        earthquakes_example_writer: {
          cluster: ['monitor'],
          index: [
            {
              names: ['earthquakes'],
              privileges: ['create_index', 'write', 'read', 'manage'],
            },
          ],
        },
      },
    },
  });
  // Generate a key 
  return Buffer.from(`${body.id}:${body.api_key}`).toString('base64');
}

generateApiKeys()
  .then(console.log)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
