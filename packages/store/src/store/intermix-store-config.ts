export const Role = {
  Admin: "Admin",
  User: "User"
};

export interface User {
  role?: string;
  name?: string;
  authToken?: string;
  authenticated: boolean;
}

export interface MenuItem {
  path: string;
  title: string;
  iconClasses?: string;
  roles?: string[];
}

interface IntermixStoreConfig {
  menu: {
    home: string;
    items?: MenuItem[];
  };
  user: User;
}

export default IntermixStoreConfig;
