import { Subject } from 'rxjs';
import IntermixStoreConfig from './intermix-store-config';

// Declare the subject
const intermixSubject = new Subject();

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
  addMenuItem: item => {
    intermixState = {
      ...intermixState,
      menu: { items: [...intermixState.menu.items, item] },
    };
    console.log(intermixState);
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
