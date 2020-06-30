import { BehaviorSubject } from 'rxjs';
import IntermixStoreConfig from './intermix-store-config';

// Declare the subject
const intermixSubject = new BehaviorSubject({});
const initialState: IntermixStoreConfig = {
  menu: { items: [] },
};

// Intermix Initial State
let intermixState: IntermixStoreConfig = initialState;

const IntermixGlobalStore = {
  init: () => {
    intermixState = { ...intermixState };
    intermixSubject.next(intermixState);
  },
  subscribe: setState => intermixSubject.subscribe(setState),
  observable: intermixSubject.asObservable(),
  addMenuItem: item => {
    intermixState = {
      ...intermixState,
      menu: { items: [...intermixState.menu.items, item] },
    };
    intermixSubject.next(intermixState);
  },
  deleteMenuItem: path => {
    intermixState = {
      ...intermixState,
      menu: {
        items: intermixState.menu.items.filter(item => item.path !== path),
      },
    };
    intermixSubject.next(intermixState);
  },
  clearMenu: () => {
    intermixState = { ...intermixState, menu: {} };
    intermixSubject.next(intermixState);
  },
  ...initialState,
};

export default IntermixGlobalStore;
