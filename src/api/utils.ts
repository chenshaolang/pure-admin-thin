export const baseUrlApi = (url: string) => `/api/${url}`;

/**
 * 将对象转换为 URL 查询字符串
 * @param params 查询参数对象
 * @returns URL 查询字符串，如 "key1=value1&key2=value2"
 */
export const buildQueryParams = (params: Record<string, any>): string => {
  if (!params || Object.keys(params).length === 0) {
    return "";
  }

  const queryParts: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    // 跳过 undefined、null 和空字符串
    if (value === undefined || value === null || value === "") {
      return;
    }

    // 处理数组类型参数
    if (Array.isArray(value)) {
      value.forEach(item => {
        if (item !== undefined && item !== null && item !== "") {
          queryParts.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
          );
        }
      });
    } else {
      // 处理普通类型参数
      queryParts.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      );
    }
  });

  return queryParts.join("&");
};

/**
 * 将查询参数拼接到 URL 上
 * @param url 基础 URL
 * @param params 查询参数对象
 * @returns 带有查询参数的完整 URL
 */
export const buildUrlWithQuery = (
  url: string,
  params: Record<string, any>
): string => {
  const queryString = buildQueryParams(params);

  if (!queryString) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${queryString}`;
};
