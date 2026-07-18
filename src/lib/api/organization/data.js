import { serverFetch } from "../server";

export const getOrganizationData = async (email) => {
  const res = await serverFetch(`api/organization/${email}`);
  return res;
};
