import React from "react";
import { useMutation } from "react-query";
import { request } from "../utils/AxiosInterseptor";

const addUser = (user) => {
    return request({
        url: "/registration/register",
        method: "post",
        data: user,
    });
};

export const userRegistration = () => {
    return useMutation(addUser);
};
