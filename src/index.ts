import { app } from "./app";
import { HOST, PORT } from "./env";

app.listen(PORT, () => {
  console.log(`[server]: is running at http://${HOST}:${PORT}`);
});
