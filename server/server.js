import app from "./app.js";

const port = 8000;
app.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} environment`
  );
});
