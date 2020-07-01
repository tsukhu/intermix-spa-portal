import React from "react";
import { getGlobalStore } from "@intermix/store";
import { useTranslation } from "react-i18next";

const Root: React.FC<any> = (props) => {
  const [globalStore, setGlobalStore] = React.useState(getGlobalStore());
  const { t } = useTranslation();
  React.useLayoutEffect(() => {
    globalStore.subscribe(setGlobalStore);
  }, []);
  return (
    <section className="inset-0 mt-20 sm:mt-16 sm:ml-56 absolute">
      <div className="flex flex-1 px-4 py-6 sm:px-0 h-full w-full justify-center border-4 border-dashed border-gray-200 rounded-lg h-96">
        {props.name} is mounted!
        <h2>  {t("Welcome to React")}</h2>
      </div>
    </section>
  );
};

export default Root;
