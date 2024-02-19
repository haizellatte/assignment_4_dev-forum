import bodyParser from "body-parser";
import express from "express";
import controllers from "./contexts";
import authenticator from "./middlewares/authenticator";

const app = express();
const port = 1997;
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(authenticator);
app.use(controllers);

app.listen(port, () => {
  console.log("**----------------------------------**");
  console.log("========== Server is On!!! ========== ");
  console.log("**----------------------------------**");
});
