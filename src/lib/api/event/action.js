"use server"

import { serverMutation } from "../server"

export const addEvent=async(data)=>{
    const res= await serverMutation(`api/events`,"POST", data);
    return res;
}

export const updateEvent=async(data,id)=>{
    const res=await serverMutation(`api/events/${id}`, "PATCH" ,data)
    return res;
}
export const eventDelete=async(id)=>{
    const res=await serverMutation(`api/events/${id}`, "DELETE")
    return res;
}