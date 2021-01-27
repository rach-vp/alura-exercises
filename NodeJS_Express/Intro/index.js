const customExpress = require("./config/customExpress");

const cExpress = require('./config/customExpress');

const app = cExpress();
app.listen(3000, () => console.log('Server listening on port 3000'));
