import { handleError } from "../utils/handleServerError.js";

export const trycatch = (controller) => {
    return async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (error) {
        handleError(res,error)
      }
    };
  };
  

  