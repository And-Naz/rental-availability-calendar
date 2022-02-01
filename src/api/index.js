import Request from "./Request";
import apiInterFace from "./apiInterface";
const api = new Request(apiInterFace)
export default api;

export function getOrderInfoOfItems(filter, items) {
    return api.helpers ? api.helpers.getOrderInfoOfItems(filter, items) : []
}