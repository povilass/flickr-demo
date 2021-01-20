import {ErrorResponse} from "./models";

export const apiRejectResolver = (data: any) => {

    if (data && data.stat === 'fail') {
        return Promise.reject<ErrorResponse>(data);
    }
    return data;
};
