import app from "./app";
import { connectDb } from "./src/config/database";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error starting server:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

startServer();
