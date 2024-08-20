import express from "express";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import mongoose from "mongoose";

import { schema } from "./graphql/schema";

const app = express();

app.use(cors({origin: "http://localhost:5173"}));


app.all("/graphql", createHandler({ schema }));

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

mongoose.connect("mongodb://localhost:27017/onlineshop").then(() => {
  console.log("connected to db");
  app.listen(3000);
});
