import dayjs from "dayjs";
import { message } from "@/utils/message";
import { forceLogout, getOnlineLogsList } from "@/api/system";
import { reactive, ref, onMounted, toRaw } from "vue";
import type { PaginationProps } from "@pureadmin/table";

export function useRole() {
  const form = reactive({
    username: ""
  });
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "序号",
      prop: "id",
      minWidth: 60
    },
    {
      label: "用户名",
      prop: "username",
      minWidth: 100
    },
    {
      label: "登录 IP",
      prop: "ip",
      minWidth: 140
    },
    {
      label: "登录地点",
      prop: "address",
      minWidth: 140
    },
    {
      label: "操作系统",
      prop: "system",
      minWidth: 100
    },
    {
      label: "浏览器类型",
      prop: "browser",
      minWidth: 100
    },
    {
      label: "登录时间",
      prop: "loginTime",
      minWidth: 180,
      formatter: ({ loginTime }) =>
        dayjs(loginTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation"
    }
  ];

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
    pagination.pageSize = val;
    pagination.currentPage = 1; // 改变每页条数时，重置到第一页
    onSearch(1, val);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
    pagination.currentPage = val;
    onSearch(val, pagination.pageSize);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  function handleOffline(row) {
    forceLogout({ userId: row.id, reason: "管理员强制退出" }).then(() => {
      message(`${row.username}已被强制下线`, { type: "success" });
      onSearch();
    }).catch(() => {
      message(`强制下线失败`, { type: "error" });
    });
  }

  async function onSearch(page?: number, limit?: number) {
    loading.value = true;

    // 如果传入了 page 或 limit 参数，更新 pagination
    if (page !== undefined) {
      pagination.currentPage = page;
    }
    if (limit !== undefined) {
      pagination.pageSize = limit;
    }

    // 构建请求参数
    const params = {
      ...toRaw(form),
      page: pagination.currentPage,
      limit: pagination.pageSize
    };

    const { data } = await getOnlineLogsList(params);
    dataList.value = data.list;
    pagination.total = data.total;

    // 如果后端返回了 pageSize 和 currentPage，使用后端返回的值
    if (data.pageSize !== undefined) {
      pagination.pageSize = data.pageSize;
    }
    if (data.currentPage !== undefined) {
      pagination.currentPage = data.currentPage;
    }

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }


  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    handleOffline,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
