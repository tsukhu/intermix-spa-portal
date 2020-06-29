interface MenuItem {
  path: string;
  title: string;
  iconClasses?: string;
}
interface IntermixStoreConfig {
  menu: {
    items?: MenuItem[];
  };
}

export default IntermixStoreConfig;
