const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
