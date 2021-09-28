import { request } from 'umi'

/** 登录接口 POST /api/login */
export async function login(body: API.LoginParams, options?: Record<string, any>) {
  return request<API.Result<API.LoginParams>>('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: Record<string, any>) {
  return request<API.Result<API.CurrentUser>>('/api/userInfo', {
    method: 'GET',
    params: (options || {}),
  });
}
