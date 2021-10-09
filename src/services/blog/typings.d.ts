declare namespace API {
  type MenuListItem = {
    id?: string;
    name?: string;
    route?: string;
    weight?: number;
  };

  type CurrentUser = {
    name?: string;
    avatar?: string;
    id?: string;
    accountId?: string;
    email?: string;
    title?: string;
    country?: string;
    access?: string;
    address?: string;
    phone?: string;
  };

  type LoginParams = {
    id?: string;
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  }

  type Result<T = any> = {
    code: number;
    data: T;
    msg: string;
  };
}
