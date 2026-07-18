"use server"

import { serverMutation } from "../server"

export const addOrganization=async(data)=>{
    const res= await serverMutation("api/organizations","POST",data)
    return res;
}