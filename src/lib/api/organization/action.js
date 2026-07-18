"use server"

import { serverMutation } from "../server"

export const addOrganization=async(data)=>{
    const res= await serverMutation("api/organizations","POST",data)
    return res;
}
export const updateOrganization=async(data,id)=>{
    console.log(data,id);
    const res= await serverMutation(`api/organization/${id}`,"PATCH",data)
    return res;
}