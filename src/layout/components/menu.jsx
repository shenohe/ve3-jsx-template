import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Menu, Submenu, MenuItem } from "tdesign-vue-next";
import { AppIcon, ControlPlatformIcon, WealthIcon, TaskIcon, MoneyIcon, Folder1Icon, WalletIcon } from "tdesign-icons-vue-next";
import routes from "@/routes";
import utils from "@/libs/utils";
import { useConfigStore } from '@/store';
import ProductSvg from '@/images/svgs/product.svg?component'
import MerchantSvg from '@/images/svgs/merchant.svg?component'
import PersonnelSvg from '@/images/svgs/personnel.svg?component'
import MaterialSvg from '@/images/svgs/material.svg?component'
import PromptSvg from '@/images/svgs/prompt.svg?component'
import ChannelSvg from '@/images/svgs/channel.svg?component'
import StickerStyleSvg from '@/images/svgs/sticker-style.svg?component'
import StickerDetailSvg from '@/images/svgs/sticker-detail.svg?component'
import OverviewSvg from '@/images/svgs/overview.svg?component'
import EvaluationSvg from '@/images/svgs/evaluation.svg?component'


export default defineComponent({
  setup(props, context) {
    // 
    const router = useRouter();
    const route = useRoute();
    const configStore = useConfigStore();

    // 图标映射
    const icons = {
      AppIcon: () => <AppIcon />,
      ControlPlatformIcon: () => <ControlPlatformIcon />,
      WealthIcon: () => <WealthIcon />,
      TaskIcon: () => <TaskIcon />,
      MoneyIcon: () => <MoneyIcon />,
      Folder1Icon: () => <Folder1Icon />,
      WalletIcon: () => <WalletIcon />,
      product: () => <ProductSvg />,
      merchant: () => <MerchantSvg />,
      personnel: () => <PersonnelSvg />,
      material: () => <MaterialSvg />,
      prompt: () => <PromptSvg />,
      channel: () => <ChannelSvg />,
      'sticker-style': () => <StickerStyleSvg />,
      'sticker-detail': () => <StickerDetailSvg />,
      overview: () => <OverviewSvg />,
      evaluation: () => <EvaluationSvg />
    };

    // 菜单
    const menu = computed(() => utils.getMenuFromRoutes(routes, "/"));

    // 当前激活菜单
    const menuExpandedKeys = ref([]);
    const menuSelectedKey = computed(() => {
      const items = utils.flatten(menu.value, "children", true);
      let target;

      items.forEach(item => {
        if (route.path.indexOf(item.path) > -1) {
          target = item;
        }
      });

      if (target) {
        return target.path;
      }
    });

    // 
    watch(menuSelectedKey, value => {
      const parentPath = value?.substring(0, value.lastIndexOf("/"));

      if (!menuExpandedKeys.value.includes(parentPath)) {
        menuExpandedKeys.value.push(parentPath);
      }
    }, {
      immediate: true
    });

    // 
    const handleExpand = value => {
      menuExpandedKeys.value = value;
    };

    // 
    const handleChange = path => {
      if (/(http|https):\/\/([\w.]+\/?)\S*/.test(path)) {
        window.open(path, "_blank");
      }
      else {
        // 获取当前的 appId
        const appId = configStore.getAppid;
        
        // 如果有 appId 且路径不是已经带 appId 前缀的，则添加前缀
        if (appId && !path.startsWith(`/${appId}/`) && path !== '/login' && path !== '/config') {
          const newPath = `/${appId}${path}`;
          router.push(newPath);
        } else {
          router.push(path);
        }
      }
    };

    // 菜单折叠状态
    const collapsed = ref(false);
    const onAutoCollapsed = () => collapsed.value = window.innerWidth <= 1024;

    // 
    onMounted(() => {
      onAutoCollapsed();
      window.onresize = () => onAutoCollapsed();
    });

    // 
    onBeforeUnmount(() => {
      window.onresize = null;
    });

    // 
    const getMenuItems = list => {
      return list.map(item => {
        if (item.children && item.children.length > 0) {
          return (
            <Submenu key={item.path} value={item.path} title={item.meta.title} v-slots={{ icon: icons[item.meta.icon] }}>
              {getMenuItems(item.children)}
            </Submenu>
          );
        }
        else {
          return (
            <MenuItem key={item.path} value={item.path} routerLink={true} v-slots={{ icon: icons[item.meta.icon] }}>{item.meta.title}</MenuItem>
          );
        }
      });
    };

    // Render
    return () => {
      return (
        <Menu expanded={menuExpandedKeys.value} value={menuSelectedKey.value} collapsed={collapsed.value} onExpand={handleExpand} onChange={handleChange}>
          {getMenuItems(menu.value)}
        </Menu>
      )
    };
  }
});