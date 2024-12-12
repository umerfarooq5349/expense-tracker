import { transectionSchema } from "./../schema/transectionSchema.js";
import { transectionsList } from "./../model/transectionModel.js";
import { sendResponse } from "../utils/sendResponse.js";

const getTransections = (req, res) => {
  return sendResponse(res, 200, transectionsList);

  //   res.status(200).json({ transectionsList });
};

const addTransection = (req, res) => {
  const { transectionReq } = req.body;

  try {
    transectionSchema.parse(transectionReq);
  } catch (error) {
    return sendResponse(res, 403, "Not in a required format", null, error);

    // res.status(403).json({ message: "Not in a required format", error });
  }

  const transections = transectionsList;
  if (
    transections.find((transection) => transection.id === transectionReq.id)
  ) {
    return sendResponse(res, 403, "Record already exits");
    // res.status(403).json({ message: "Id already exists" });
  }

  transections.push(transectionReq);
  return sendResponse(res, 200, "Transection added", transections);

  //   res.status(200).json({ transections });
};

const deleteTransection = (req, res) => {
  const { id } = req.params;
  const transections = transectionsList;
  //   console.log(id);

  const deletetransection = transections.indexOf(
    transections.find((transection) => transection.id === id)
  );
  if (deleteTransection) return sendResponse(res, 404, "Transection not found");

  const deleted = transections.splice(deletetransection, deletetransection);

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

export {
  getTransections,
  addTransection,
  deleteTransection,
  getTransectionsSummary,
};
