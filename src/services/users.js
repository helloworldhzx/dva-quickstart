import {request} from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
export function fetchData(opt) {
  return request({
    url:'/api/coup/coupRelHistory',
    method:'POST',
    data:opt.param,
    pageIndex:opt.pageIndex
  })
}
