import { checkSchema, } from "../helpers/index.js";
const validateBody = (schema) => {
    const func = async (req, _, next) => {
        checkSchema(schema, req, next)
        next()
      };
      return func;
};

export default validateBody