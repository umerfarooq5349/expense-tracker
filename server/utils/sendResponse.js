export const sendResponse = (res, status, message, transection, error) => {
  return res.status(status).json({ message, transection, error });
};
