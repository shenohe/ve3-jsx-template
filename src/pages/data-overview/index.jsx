import { defineComponent, ref, onBeforeMount, computed, markRaw } from "vue";
import CommonTitle from "@/components/common-title";
import { Button, Table, Pagination } from "tdesign-vue-next";
import SearchPanel from "@/components/searchPanel";
import StatisticsCards from "@/components/statistics-cards";
import { searchList, COLUMNS } from "./constant";
import { useRequest, usePagination } from "vue-request";
import ViewIcon from '@/images/svgs/view.svg?component'
import GenerateIcon from '@/images/svgs/generate.svg?component'
import ReleaseIcon from '@/images/svgs/release.svg?component'
import IncludeIcon from '@/images/svgs/include.svg?component'
import ExportIcon from '@/images/svgs/exit.svg?component'

export default defineComponent({
  setup(props, context) {
    const exportLoading = ref(false);
    const searchForm = ref({});
    const searchFormList = ref(JSON.parse(JSON.stringify(searchList)));
    // const { data: list, loading, run: getList, current: pageNum, pageSize, total: pageTotal } = usePagination(dataview.getDataviewList, {
    //   manual: true,
    //   defaultParams: [{ pageNum: 1, pageSize: 20, ...searchForm.value }],
    //   pagination: {
    //     currentKey: 'pageNum',
    //     pageSizeKey: 'pageSize',
    //     totalKey: 'data.total',
    //   },
    // })
    const tableData = computed(() => []);
    const statisticsInfoData = ref({});
    // 统计数据配置
    const statisticsData = ref([
      {
        title: "访问数",
        value: 'access_cnt',
        icon: markRaw(ViewIcon)
      },
      {
        title: "生成数", 
        value: 'generate_cnt',
        icon: markRaw(GenerateIcon)
      },
      {
        title: "发布数",
        value: 'publish_cnt',
        icon: markRaw(ReleaseIcon)
      },
      {
        title: "收录数",
        value: 'feedback_accept_cnt',
        icon: markRaw(IncludeIcon)
      }
    ]);
    const onView = () => {
      console.log('onView');
    }
    const onFeedback = () => {
      console.log('onFeedback');
    }
    const handleExport = () => {
      console.log('handleExport');
    }
    const columns = COLUMNS(onView, onFeedback);
    const handleSearch = (formData) => {
      searchForm.value = { ...formData };
      // getList({ pageNum: 1, pageSize: 20, ...searchForm.value });
    };
    const handleReset = (formData) => {
      searchForm.value = { ...formData}
      // getList({ pageNum: 1, pageSize: 20, ...searchForm.value });
    };
    const pageChange = (pageInfo) => {
      // if (pageInfo.current !== pageNum.value) {
      //   pageNum.value = pageInfo.current;
      // }
      // if (pageInfo.pageSize !== pageSize.value) {
      //   pageSize.value = pageInfo.pageSize;
      // }
    }
    onBeforeMount(() => {
      // getList({ pageNum: 1, pageSize: 20, ...searchForm.value });
    })
    return () => (
      <>
        <div class="data-overview-page flex flex-col h-full">
          <CommonTitle></CommonTitle>
          <div class="mt-16">
            <StatisticsCards data={statisticsData.value} infoData={statisticsInfoData.value} />
          </div>
          <div class="mt-16 bg-white rounded-8 px-20">
            <SearchPanel searchList={searchFormList.value} onSearch={handleSearch} onReset={handleReset} />
          </div>
          <div class="mt-16 rounded-t-[8px] bg-white px-20 pt-16">
            <Button theme="primary" onClick={handleExport} loading={exportLoading.value} v-slots={{
              icon: () => {
                return <ExportIcon class="size-20" />
              }
            }}>导出</Button>
          </div>
          <div class=" bg-white p-20 !pt-16 flex-1 min-h-0">
            <Table
              height="100%"
              columns={columns}
              data={tableData.value}
              // loading={loading.value}
              rowKey="id"
            />
          </div>
          {/* <div class="flex justify-end bg-white px-20 pb-32">
            <Pagination
              total={pageTotal.value}
              show-jumper
              v-model:pageSize={pageSize.value}
              v-model:current={pageNum.value}
              onPageChange={pageChange}
            />
          </div> */}
        </div>
      </>
    )
  },
});