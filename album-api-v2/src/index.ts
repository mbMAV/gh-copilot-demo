import app from "./app";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`album-api-v2 listening on port ${port}`);
  });
}

export default app;
