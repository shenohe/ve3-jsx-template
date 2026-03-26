import ActionLink from "@/components/action-link";
import { COLLECTION_STATUS, PUBLISH_STATUS } from "@/libs/enums";
import dayjs from "dayjs";

export const searchList = [
  {
    label: "生成时间",
    name: "generation_time",
    value: [],
    defaultValue: [],
    firstField: 'begin_time',
    secondField: 'end_time',
    type: "DATEPICKER_RANGE",
    attrs: {
      placeholder: ['开始日期', '结束日期']
    }
  },
  
  {
    label: "桌贴编号",
    name: "sticker_id_str",
    value: "",
    defaultValue: "",
    type: "INPUT",
    attrs: {
      placeholder: "请输入桌贴编号"
    }
  },
  {
    label: "渠道",
    name: "channel_id",
    value: "",
    defaultValue: "",
    type: "SELECT",
    options: [],
    attrs: {
      placeholder: "请选择渠道",
      filterable: true
    }
  },
  {
    label: "内容",
    name: "content",
    value: "",
    defaultValue: "",
    type: "INPUT",
    attrs: {
      placeholder: "请输入内容"
    }
  },
  {
    label: "发布状态",
    name: "publish_status",
    value: "",
    defaultValue: "",
    type: "SELECT",
    options: PUBLISH_STATUS,
    attrs: {
      placeholder: "请选择发布状态"
    }
  },
  {
    label: "收录状态",
    name: "feedback_status",
    value: "",
    defaultValue: "",
    type: "SELECT",
    options: COLLECTION_STATUS,
    attrs: {
      placeholder: "请选择收录状态"
    }
  },
];

export const COLUMNS = (onView, onFeedback) => {
  return [
    {
      colKey: "index",
      title: "序号",
      width: 120,
      cell: (h, { rowIndex }) => rowIndex + 1
    },
    {
      colKey: "sticker_id_str",
      title: "桌贴编号",
      width: 340
    },
    {
      colKey: "content",
      title: "内容",
      ellipsis: true,
      width: 220
    },
    {
      colKey: "publish_status",
      title: "发布状态",
      width: 120,
      cell: (h, { row }) => {
        return <div class={`${row.publish_status === '已发布' ? 'text-[#2E8B57]' : 'text-[#8E8E8E]'}`}>{ row.publish_status }</div>
      }
    },
    {
      colKey: "channel_display_name",
      title: "渠道",
      width: 120
    },
    {
      colKey: "generation_time",
      title: "生成时间",
      width: 220,
      cell: (h, { row }) => {
        return <div>{ row.generation_time ? dayjs(row.generation_time).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
      }
    },
    // {
    //   colKey: "charged_tokens",
    //   title: "算力消耗",
    //   width: 120,
    // },
    {
      colKey: "feedback_status",
      title: "收录状态",
      width: 120,
      cell: (h, { row }) => {
        return <div class={`${row.feedback_status === '已收录' ? 'text-[#2E8B57]' : row.feedback_status === '未收录' ? 'text-[#8E8E8E]' : 'text-[#FF8F00]'}`}>{ row.feedback_status }</div>
      }
    },

    {
      colKey: "action",
      title: "操作",
      fixed: "right",
      align: "right",
      width: 120,
      cell: (h, { row, rowIndex }) => {
        const linkList = []
        if (onView) {
          linkList.push({
            label: "查看",
            attrs: {
              onClick: () => onView(row)
            }
          })
        }
        if (row.publish_status === '已发布' && onFeedback) {
          linkList.push({
            label: "收录反馈",
            attrs: {
              onClick: () => onFeedback(row)
            }
          })
        }
        return (
          <ActionLink linkList={linkList} />
        )
      }
    }
  ]
}