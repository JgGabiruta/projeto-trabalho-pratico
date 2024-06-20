/*// JSON - Server Module
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('../scripts/api/db.json');

// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    "/*": "/$1",
  })
);

server.use(router);
//Listen to port
server.listen(3000, () => {
  console.log('JSON Server está em execução!');
});
// Export the server api
module.exports = server;
*/