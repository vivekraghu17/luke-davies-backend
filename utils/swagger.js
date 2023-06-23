const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("../package.json");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Luke Davies backend API docs",
      version,
    },
    servers: [
      {
        api: "http://localhost:8000/",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app, port) {
  //swagger page set up
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  //DOCS in JSON format
  app.get("docs.json", (req, res) => {
    res.setHeader("Content-type", "application/JSON");
    res.send(swaggerSpec);
  });
  console.info(`API specifications available at http://localhost:${port}/docs`);
}
module.exports = swaggerDocs;
