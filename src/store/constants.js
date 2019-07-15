export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const POST_SENDEMAIL = createRequestTypes("POST_SENDEMAIL");
export const POST_CHECKSTATUS = createRequestTypes("POST_CHECKSTATUS");