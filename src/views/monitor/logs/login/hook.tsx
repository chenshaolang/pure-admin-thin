import dayjs from "dayjs";
import { message } from "@/utils/message";
import { getKeyList } from "@pureadmin/utils";
import { clearLoginLogs, deleteLoginLogs, getLoginLogsList } from "@/api/system";
import { usePublicHooks } from "@/views/system/hooks";
import type { PaginationProps } from "@pureadmin/table";
import { type Ref, reactive, ref, onMounted, toRaw } from "vue";

export function useRole(tableRef: Ref) {
  const form = reactive({
    username: "",
    status: "",
    loginTime: ""
  });
  const dataList = ref([]);
  const loading = ref(true);
  const selectedNum = ref(0);
  const { tagStyle } = usePublicHooks();

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    {
      label: "序号",
      prop: "id",
      minWidth: 90
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
      label: "登录状态",
      prop: "status",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.status)}>
          {row.status === 1 ? "成功" : "失败"}
        </el-tag>
      )
    },
    {
      label: "登录行为",
      prop: "behavior",
      minWidth: 100
    },
    {
      label: "登录时间",
      prop: "loginTime",
      minWidth: 180,
      formatter: ({ loginTime }) =>
        dayjs(loginTime).format("YYYY-MM-DD HH:mm:ss")
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

  /** 当CheckBox选择项发生变化时会触发该事件 */
  function handleSelectionChange(val) {
    selectedNum.value = val.length;
    // 重置表格高度
    tableRef.value.setAdaptive();
  }

  /** 取消选择 */
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空用户的选择
    tableRef.value.getTableRef().clearSelection();
  }

  /** 批量删除 */
  function onbatchDel() {
    // 返回当前选中的行
    const curSelected = tableRef.value.getTableRef().getSelectionRows();

    deleteLoginLogs({ ids: getKeyList(curSelected, "id") }).then(() => {
      message(`已删除序号为 ${getKeyList(curSelected, "id")} 的数据`, {
        type: "success"
      });
      tableRef.value.getTableRef().clearSelection();
      onSearch();
    }).catch(() => {
      message(`删除失败`, { type: "error" });
    });
  }

  /** 清空日志 */
  function clearAll() {
    clearLoginLogs().then(() => {
      message("已删除所有日志数据", { type: "success" });
      onSearch();
    }).catch(() => {
      message(`删除失败`, { type: "error" });
    });
    onSearch();
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

    const { data } = await getLoginLogsList(params);
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
    // 重置表单时，重置到第一页
    pagination.currentPage = 1;
    onSearch(1);
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
    selectedNum,
    onSearch,
    clearAll,
    resetForm,
    onbatchDel,
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleSelectionChange
  };
}
