"use server"

import { serverMutation } from "../server"

export const addEvent=async(data)=>{
    const res= await serverMutation(`api/events`,"POST", data);
    return res;
}