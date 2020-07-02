import axios from 'axios'
export function request(config) {

  //1创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3/',
    timeout: 5000
  })
  // 2添加请求拦截器
  instance.interceptors.request.use(config => {

    return config;
  }, error=> {

    return Promise.reject(error);
  });

  //2.1添加响应拦截器
  instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


  return instance(config)

}
