import {request} from './request'


//首页轮播数据
export function getHomeMultidata(){
 return request('home/multidata')
}

//底部数据
export function getHomeGoods(type,page){
  return request({
    url:'home/data',
    params:{
      type,
      page
    }
  })
 }