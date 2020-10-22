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

export interface TaskData {
  drillbackurl: string;
  id: string;
  status: string;
}

export interface Task {
  taskId: string;
  taskName: string;
  taskData: TaskData;
}

export interface TaskStatus {
  label: string;
  approved: boolean;
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
  tasks: Task[];
  tasksUpdated: boolean;
}

export default IntermixStoreConfig;
