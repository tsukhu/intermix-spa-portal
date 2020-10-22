import { Observable, BehaviorSubject, Subject } from "rxjs";
import IntermixStoreConfig, {
  Role,
  User,
  MenuItem,
  Task,
} from "./intermix-store-config";

// Declare the subject

export default class IntermixGlobalStore {
  private static instance: IntermixGlobalStore;
  // Intermix Initial State
  initialState: IntermixStoreConfig = {
    menu: { home: "", items: [] },
    user: { authenticated: false, role: Role.User, name: "", authToken: "" },
    tasks: [],
    tasksUpdated: true
  };
  intermixState: IntermixStoreConfig = this.initialState;
  intermixSubject: Subject<IntermixStoreConfig> = new BehaviorSubject<
    IntermixStoreConfig
  >(this.intermixState);
  store: any;
  constructor() {
    if (IntermixGlobalStore.instance) {
      throw new Error("Error - use Singleton.getInstance()");
    }

    this.store = {
      init: () => {
        this.intermixState = { ...this.intermixState };
        this.intermixSubject.next(this.intermixState);
      },
      subscribe: (setState: any) => this.intermixSubject.subscribe(setState),
      observable: this.intermixSubject.asObservable(),
      setHomePagePath: (home: string) => {
        this.intermixState = {
          ...this.intermixState,
          menu: {
            ...this.intermixState.menu,
            home
          },
        };
        this.intermixSubject.next(this.intermixState);
      },
      addMenuItem: (item: MenuItem) => {
        this.intermixState = {
          ...this.intermixState,
          menu: {
            ...this.intermixState.menu,
            items: [...this.intermixState.menu.items, item],
          }
        };
        this.intermixSubject.next(this.intermixState);
      },
      setTasks: (tasks: Task[]) => {
        this.intermixState = {
          ...this.intermixState,
          tasks
        };
        this.intermixSubject.next(this.intermixState);
      },
      setTasksUpdated: (value: boolean) => {
        this.intermixState = {
          ...this.intermixState,
          tasksUpdated: value
        };
        this.intermixSubject.next(this.intermixState);
      },
      setUser: (user: User) => {
        this.intermixState = {
          ...this.intermixState,
          user
        };
        this.intermixSubject.next(this.intermixState);
      },
      deleteMenuItem: (path: string) => {
        this.intermixState = {
          ...this.intermixState,
          menu: {
            ...this.intermixState.menu,
            items: this.intermixState.menu.items.filter(
              (item: any) => item.path !== path
            )
          }
        };
        this.intermixSubject.next(this.intermixState);
      },
      clearMenu: () => {
        this.intermixState = {
          ...this.intermixState,
          menu: { ...this.initialState.menu },
        };
        this.intermixSubject.next(this.intermixState);
      },
      ...this.initialState
    };

    this.store.init();
  }

  static getInstance(): IntermixGlobalStore {
    IntermixGlobalStore.instance =
      IntermixGlobalStore.instance || new IntermixGlobalStore();
    return IntermixGlobalStore.instance;
  }

  init(): any {
    return this.store.init();
  }

  setUser(user: User) {
    return this.store.setUser(user);
  }

  setTasks(tasks: Task[]) {
    return this.store.setTasks(tasks);
  }

  setTasksUpdated(value: boolean) {
    return this.store.setTasksUpdated(value);
  }

  addMenuItem(item: MenuItem) {
    return this.store.addMenuItem(item);
  }

  setHomePagePath(path: string) {
    return this.store.setHomePagePath(path);
  }

  deleteMenuItem(path: string) {
    return this.store.deleteMenuItem(path);
  }

  clearMenu() {
    return this.store.clearMenu();
  }

  subscribe(setState: any) {
    return this.store.subscribe(setState);
  }

  getSubscription() {
    return this.intermixSubject.asObservable();
  }

  hasPermission(path) {
    const { user, menu } = this.intermixState;

    if (menu && menu.items && path) {
      // Get the Menu Item for the given path
      const MenuItem = menu.items.find((item: any) => item.path === path);

      if (MenuItem && MenuItem.roles && user) {
        return MenuItem.roles.indexOf(user.role) !== -1;
      }

      return true;
    }
    return true;
  }
}
