import { http } from "@/utils/http";
import { baseUrlApi, buildUrlWithQuery } from "./utils";
import type { FormItemProps as UserFormItemProps } from "@/views/system/user/utils/types";
import type { FormItemProps as RoleFormItemProps } from "@/views/system/role/utils/types";
import type { FormItemProps as MenuFormItemProps } from "@/views/system/menu/utils/types";
import type { FormItemProps as DeptFormItemProps } from "@/views/system/dept/utils/types";
type Result = {
  success: boolean;
  data?: Array<any>;
};

type ResultTable = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

/** 获取系统管理-用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<ResultTable>("post", baseUrlApi("users/search"), {
    data
  });
};

/** 获取系统管理-用户管理-新增用户 */
export const addUser = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("users/create"), { data });
};

/** 获取系统管理-用户管理-修改用户 */
export const updateUser = (data?: UserFormItemProps) => {
  return http.request<Result>("patch", baseUrlApi(`users/update/${data.id}`), {
    data
  });
};

/** 系统管理-用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
  return http.request<Result>("get", baseUrlApi("roles/all"));
};

/** 系统管理-用户管理-分配角色 */
export const assignRole = (id: string, roleIds: number[]) => {
  return http.request<Result>("post", baseUrlApi(`users/assign-role/${id}`), {
    data: { roleIds }
  });
};

/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getRoleIds = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("users/list-role-ids"), {
    data
  });
};

/** 系统管理-用户管理-根据Id列表删除对应的数据 */
export const deleteUsers = (data?: object) => {
  return http.request<Result>("delete", baseUrlApi("users/delete"), { data });
};

/** 系统管理-用户管理-重置密码 */
export const resetPassword = (id: string, password: string) => {
  return http.request<Result>(
    "post",
    baseUrlApi(`users/reset-password/${id}`),
    {
      data: { password }
    }
  );
};

/** 获取系统管理-新增角色 */
export const addRole = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("roles/create"), { data });
};

/** 获取系统管理-修改角色 */
export const updateRole = (data?: RoleFormItemProps) => {
  return http.request<Result>("patch", baseUrlApi(`roles/update/${data.id}`), {
    data
  });
};

/** 获取系统管理-删除角色 */
export const deleteRole = (data?: object) => {
  return http.request<Result>("delete", baseUrlApi("roles/delete"), { data });
};

/** 获取系统管理-角色管理-更新角色菜单权限 */
export const updateRoleMenu = (id: number, data?: { menuIds: number[] }) => {
  return http.request<Result>(
    "post",
    baseUrlApi(`roles/update-role-menu/${id}`),
    {
      data
    }
  );
};

/** 获取系统管理-角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<ResultTable>("post", baseUrlApi("roles/search"), {
    data
  });
};

/** 获取系统管理-菜单管理列表 */
export const getMenuList = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("menus/search"), { data });
};

/** 获取系统管理-部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("depts/search"), { data });
};

/** 获取系统管理-部门管理-删除部门 */
export const deleteDept = (data?: object) => {
  return http.request<Result>("delete", baseUrlApi("depts/delete"), { data });
};

/** 获取系统监控-在线用户列表 */
export const getOnlineLogsList = (data?: object) => {
  return http.request<ResultTable>("post", baseUrlApi("online-logs/search"), {
    data
  });
};

/** 获取系统监控-在线用户-强制下线 */
export const forceLogout = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("online-logs/force-logout"), {
    data
  });
};

/** 获取系统监控-登录日志列表 */
export const getLoginLogsList = (data?: object) => {
  return http.request<ResultTable>(
    "get",
    buildUrlWithQuery(baseUrlApi("login-logs/search"), data)
  );
};

/** 获取系统监控-登录日志-清空登录日志 */
export const clearLoginLogs = () => {
  return http.request<Result>("delete", baseUrlApi("login-logs/delete-all"));
};

/** 获取系统监控-操作日志列表 */
export const getOperationLogsList = (data?: object) => {
  return http.request<ResultTable>("post", baseUrlApi("operation-logs"), {
    data
  });
};

/** 获取系统监控-系统日志列表 */
export const getSystemLogsList = (data?: object) => {
  return http.request<ResultTable>("post", baseUrlApi("system-logs"), {
    data
  });
};

/** 获取系统监控-系统日志-根据 id 查日志详情 */
export const getSystemLogsDetail = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("system-logs-detail"), {
    data
  });
};

/** 获取角色管理-权限-菜单权限 */
export const getRoleMenu = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("roles/role-menu"), { data });
};

/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
export const getRoleMenuIds = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("roles/role-menu-ids"), {
    data
  });
};

/** 获取系统管理-菜单管理-新增菜单 */
export const addMenu = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("menus/create"), { data });
};

/** 获取系统管理-菜单管理-修改菜单 */
export const updateMenu = (data?: MenuFormItemProps) => {
  return http.request<Result>("patch", baseUrlApi(`menus/update/${data.id}`), {
    data
  });
};

/** 获取系统管理-菜单管理-删除菜单 */
export const deleteMenu = (data?: object) => {
  return http.request<Result>("delete", baseUrlApi("menus/delete"), { data });
};

/** 获取系统管理-部门管理-新增部门 */
export const addDept = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("depts/create"), { data });
};

/** 获取系统管理-部门管理-修改部门 */
export const updateDept = (data?: DeptFormItemProps) => {
  return http.request<Result>("patch", baseUrlApi(`depts/update/${data.id}`), {
    data
  });
};
