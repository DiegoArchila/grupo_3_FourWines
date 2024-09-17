/** @type {*}   -Type of Apy status */
const ApiStatus = {
  OK: { code: 200, message: "Request has succeeded.", name: "OK" },
  CREATED: {
    code: 201,
    message:
      "Request has succeeded and a new resource has been created as a result.",
    name: "CREATED",
  },
  BAD_REQUEST: {
    code: 400,
    message: "The request could not be understood by the server.",
    name: "BAD_REQUEST",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "The request requires user authentication information.",
    name: "UNAUTHORIZED",
  },
  NOT_FOUND: {
    code: 404,
    message: "The server can not find the requested resource.",
    name: "NOT_FOUND",
  },
};

/**
 * Format for send API's
 *
 * @param {ApiStatus} apiStatus -Status type of the Api
 * @param {*} [data=null]   -Optional data for send in the Api
 * @return {*}  -The api with format of .data, .total, .status, .message
 */
const ApiFormat = (apiStatus, data = null) => {
  let output = {};

  if (!data || data.length == 0) {
    apiStatus = ApiStatus.NOT_FOUND;
  } else {
    output.data = data;
    output.total = data.length;
  }

  /*if (data) {
    output.data = data;
    output.total = data.length;
  } else {
    apiStatus = ApiStatus.NOT_FOUND;
  }*/
  output.status = ApiStatus[apiStatus.name].code;
  output.message = ApiStatus[apiStatus.name].message;
  return output;
};

module.exports = {
  ApiFormat,
  ApiStatus,
};
