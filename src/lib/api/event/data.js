import { serverFetch } from "../server";

export const getEvents=async(email)=>{
    const res=await serverFetch(`api/events/${email}`);
    return res;
}