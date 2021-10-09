import { request } from 'umi'

/** 获取导航菜单列表 GET /api/navigation */
export async function navigation(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<API.MenuList>('/api/navigation', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增导航菜单接口 POST /api/navigation */
export async function addNav(body: API.MenuListItem, options?: Record<string, any>) {
  return request<API.Result<API.MenuListItem>>('/api/navigation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

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
