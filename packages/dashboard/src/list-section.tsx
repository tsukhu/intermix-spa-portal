import React from "react";

import { Link } from "react-router-dom";
import { getGlobalStore } from "@intermix/store";
import { useTranslation } from "react-i18next";
import { FormSection } from "./form-section";

export const ListSection: React.FC<any> = (props) => {
  const store = getGlobalStore();
  const [globalStore, setGlobalStore] = React.useState(store);
  const [showForm, setShowForm] = React.useState(false);
  React.useLayoutEffect(() => {
    globalStore.subscribe(setGlobalStore);
  }, []);
  const { t } = useTranslation();

  const refreshTasks = () => {
    store.setTasksUpdated(true);
  };
  return (
    <div className="px-4 py-6 sm:px-0 flex-grow-1 w-full justify-center rounded-lg text-sm">
      <div
        className="flex items-center bg-gray-800 text-white text-xs px-4 py-3 m-2 mx-12 rounded"
        role="alert"
      >
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
        </svg>
        <p>{`${t("Tasks Requiring Attention")} ...`}</p>
      </div>

      {showForm && (
        <FormSection
          handleSubmit={(result) => {
            setShowForm(false);
            if (result) {
              refreshTasks();
            }
          }}
          {...props}
        />
      )}
      {!showForm && (
        <section className="animate__animated animate__fadeIn inset-0 text-sm">
          <div className="relative bg-white ml-4 sm:ml-16 sm:mr-16 p-4 flex justify-center border-gray-100 border border-dotted  rounded">
            <button
              className="absolute top-0 right-0 m-4 px-0 py-1 rounded-full border-blue-500 border text-blue-500 w-8 h-8 transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
              onClick={() => setShowForm(true)}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
            <table className="border-collapse w-full mt-10 text-sm">
              <thead>
                <tr>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Process ID
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Task ID
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Type
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Stage
                  </th>
                  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {globalStore &&
                  globalStore.tasks &&
                  globalStore.tasks.map(
                    ({ processInstanceId, taskId, taskName }) => {
                      return (
                        <>
                          <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                Process ID
                              </span>
                              <span className="ml-24 lg:ml-0"> {processInstanceId}</span>
                             
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                Task ID
                              </span>
                              <span className="ml-24 lg:ml-0">{taskId}</span>
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                Type
                              </span>
                              <span className="ml-16 lg:ml-0">{`${
                                taskName
                                  .trim()
                                  .toLowerCase()
                                  .includes("po submitted")
                                  ? "PO Order"
                                  : "PO Invoice"
                              }`}</span>
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                Stage
                              </span>
                              <span className="ml-16 lg:ml-0">{taskName}</span>
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                Details
                              </span>
                              <Link
                                to={`/workflow/${taskId}`}
                                className="ml-16 lg:ml-0 px-2 py-2 border-blue-500 border text-blue-500 text-sm rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                              >
                                Details
                              </Link>
                            </td>
                          </tr>
                        </>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};
