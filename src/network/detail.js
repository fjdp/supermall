import {request} from './request'

//底部数据
export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
 }