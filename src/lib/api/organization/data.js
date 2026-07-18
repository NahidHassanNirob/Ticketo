import { serverFetch } from "../server";

export const getOrganizationData = async (email) => {
  const res = await serverFetch(`api/organization/${email}`);
  console.log(res,"result");
  return res;
};
