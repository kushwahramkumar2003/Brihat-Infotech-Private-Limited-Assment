import app from "./App";
import config from "./config";
import connectDB from "./services/connectDB";

(async function () {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(
        `[server]: Server is running at http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.log(`[server]: Server could not start`);
  }
})();
