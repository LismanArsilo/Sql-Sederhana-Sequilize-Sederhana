import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import models, { sequelize } from "./models/init-models";
import routes from "./routes/indexRoute";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

app.use("/course", routes.courseRoute);
app.use("/teacher", routes.teacherRoute);
app.use("/major", routes.majorRoute);
app.use("/student", routes.studentRoute);
app.use("/all", routes.allRoute);

const dropDatabaseSync = false;
sequelize.sync({ force: dropDatabaseSync }).then(async () => {
  if (dropDatabaseSync) {
    console.info("Database do not drop");
  }
  app.listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  });
});

export default app;
