import {HttpError} from "./index.js";

function checkSchema(schema, req, next) {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
  }

  export default checkSchema