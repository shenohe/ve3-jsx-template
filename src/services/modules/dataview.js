import axios from "@/libs/axios";

const base = '/ai-tap/v1/aitap/overview';
const Api = {
  list: `${base}/filter`,
};

export const getDataviewList = (data) => {
  return axios.post(Api.list, data);
}
export default {
  getDataviewList,
}