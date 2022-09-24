import React from "react";
import { useMutation } from "react-query";
import { request } from "../utils/AxiosInterseptor";

const addUser = (user) => {
    return request({
        url: "/login/log_in",
        method: "post",
        data: user,
    });
};

export const userLogin = () => {
    return useMutation(addUser);
};
