import { BehaviorSubject } from "rxjs";
import IntermixStoreConfig, {
  Role,
  User,
  MenuItem,
} from "./intermix-store-config";

// Declare the subject
const intermixSubject = new BehaviorSubject({});
const initialState: IntermixStoreConfig = {
  menu: { home: "", items: [] },
  user: { authenticated: false, role: Role.User, name: "", authToken: "" },
};

// Intermix Initial State
let intermixState: IntermixStoreConfig = initialState;

export default class IntermixGlobalStore {
  private static instance: IntermixGlobalStore;

  store: any;
  constructor() {
    if (IntermixGlobalStore.instance) {
      throw new Error("Error - use Singleton.getInstance()");
    }

    this.store = {
      init: () => {
        intermixState = { ...intermixState };
        intermixSubject.next(intermixState);
      },
      subscribe: (setState: any) => intermixSubject.subscribe(setState),
      observable: intermixSubject.asObservable(),
      setHomePagePath: (home: string) => {
        intermixState = {
          ...intermixState,
          menu: {
            ...intermixState.menu,
            home,
          },
        };
        intermixSubject.next(intermixState);
      },
      addMenuItem: (item: MenuItem) => {
        intermixState = {
          ...intermixState,
          menu: {
            ...intermixState.menu,
            items: [...intermixState.menu.items, item],
          },
        };
        intermixSubject.next(intermixState);
      },
      setUser: (user: User) => {
        intermixState = {
          ...intermixState,
          user: { ...intermixState.user, ...user },
        };
        intermixSubject.next(intermixState);
      },
      deleteMenuItem: (path: string) => {
        intermixState = {
          ...intermixState,
          menu: {
            items: intermixState.menu.items.filter(
              (item) => item.path !== path
            ),
          },
        };
        intermixSubject.next(intermixState);
      },
      clearMenu: () => {
        intermixState = { ...intermixState, menu: { ...initialState.menu } };
        intermixSubject.next(intermixState);
      },
      ...initialState,
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
    return this.store.observable;
  }

  hasPermission(path) {
    const { user, menu } = intermixState;

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
