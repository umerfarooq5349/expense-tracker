import Express from "express";
import {
  getTransections,
  addTransection,
  deleteTransection,
  getTransectionsSummary,
} from "../controller/transectionController.js";

const transectionRouter = Express.Router();

transectionRouter.route("/").get(getTransections).post(addTransection);

// transectionRouter.post("/", addTransection);

transectionRouter.delete("/:id", deleteTransection);

transectionRouter.get("/transectionSumary", getTransectionsSummary);

export default transectionRouter;
