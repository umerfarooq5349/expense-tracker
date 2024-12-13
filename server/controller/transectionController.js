import { transectionSchema } from "./../schema/transectionSchema.js";
import { transectionsList } from "./../model/transectionModel.js";
import { sendResponse } from "../utils/sendResponse.js";
// import { date } from "zod";

const getTransections = (req, res) => {
  return sendResponse(res, 200, transectionsList);

  //   res.status(200).json({ transectionsList });
};

const addTransection = (req, res) => {
  const { newTransection } = req.body;
  console.log(newTransection);
  try {
    transectionSchema.parse(newTransection);
  } catch (error) {
    return sendResponse(res, 403, "Not in a required format", null, error);

    // res.status(403).json({ message: "Not in a required format", error });
  }

  const transections = transectionsList;
  if (
    transections.find((transection) => transection.id === newTransection.id)
  ) {
    return sendResponse(res, 403, "Record already exits");
    // res.status(403).json({ message: "Id already exists" });
  }

  transections.push(newTransection);
  return sendResponse(res, 200, "Transection added", transections);

  //   res.status(200).json({ transections });
};

const deleteTransection = (req, res) => {
  const { id } = req.params;
  const transections = transectionsList;
  console.log("id", id);

  const deleteTransectionIndex = transections.indexOf(
    transections.find((transection) => transection.id === id)
  );
  console.log("index", deleteTransectionIndex);

  if (deleteTransectionIndex === -1)
    return sendResponse(res, 404, "Transection not found");
  if (deleteTransectionIndex === 0) {
    transections.pop();
    return sendResponse(res, 200, "Transection deleted");
  }
  transections.splice(deleteTransectionIndex, deleteTransectionIndex);
  // console.log("delete", deleted);
  return sendResponse(res, 200, "Transection deleted");

  //   res.status(200).json({ message: "Transection deleted" });
};

const getTransectionsSummary = (req, res) => {
  const transections = transectionsList;
  //   let totalExpense = 0;
  const totaltransections = transections.length;
  const totalExpense = transections.reduce(
    (total, transection) => total + transection.amount,
    0
  );

  return sendResponse(res, 200, "Here is the Summary", {
    totalExpense,
    totaltransections,
  });

  //   res.status(200).json({ totalExpense, totaltransections });
};

const validateTransection = (req, res, next) => {
  const { data } = req.body;

  console.log(data);
  const id = new Date().getMilliseconds().toString();

  const newTransection = { ...data, id, ammont: data.amount.toString() };

  req.body = { newTransection };
  next();
};
export {
  getTransections,
  addTransection,
  deleteTransection,
  getTransectionsSummary,
  validateTransection,
};
