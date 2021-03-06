import React from "react";
import { getGlobalStore } from "@intermix/store";
import { useTranslation } from "react-i18next";
import Parcel from "single-spa-react/lib/umd/parcel";

const Root: React.FC<any> = (props) => {
  const [globalStore, setGlobalStore] = React.useState(getGlobalStore());
  const [name, setName] = React.useState<any>("Svelte");
  const { t } = useTranslation();
  React.useLayoutEffect(() => {
    globalStore.subscribe(setGlobalStore);
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
    const event = new CustomEvent("change-name", {
      detail: {
        name: e.target.value,
      },
      bubbles: true,
      cancelable: true,
      composed: true, // makes the event jump shadow DOM boundary
    });
    let source = e.target || e.srcElement;
    source.dispatchEvent(event);
  };

  return (
    <section className="animate__animated animate__fadeIn inset-0 mt-20 sm:mt-16 sm:ml-56 absolute overflow-y-auto">
      <div className="px-4 py-6 sm:px-0 h-full w-full justify-center border-4 border-dashed border-gray-200 rounded-lg h-96">
        <div
          className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 m-2 mx-12 rounded"
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <p>{`${props.name} ${t("is mounted!")} ... ${t(
            "Welcome to React"
          )}`}</p>
        </div>
        <div className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/4">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                React App
              </label>
            </div>
            <div className="md:w-3/4">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={name}
                onChange={(e: any) => handleChange(e)}
              />
            </div>
          </div>
        </div>
        <Parcel
          config={() => System.import("@intermix/widgets")}
          myname={name}
        />
      </div>
    </section>
  );
};

export default Root;
