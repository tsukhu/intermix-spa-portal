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
  console.log(props.wfApiUrl);
  return (
    <section className="animate__animated animate__fadeIn inset-0 mt-20 sm:mt-16 sm:ml-48 absolute flex overflow-y-auto">
      <div className="px-4 py-6 sm:px-0 flex-grow-1 w-full justify-center rounded-lg">
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
          <section className="animate__animated animate__fadeIn inset-0">
            <div className="relative bg-white ml-4 sm:ml-16 sm:mr-16 p-4 flex justify-center border-gray-100 border border-dotted  rounded">
              <button
                className="absolute top-0 right-0 m-4 px-2 py-2 rounded-full border-blue-500 border text-blue-500 w-10 h-10 transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                onClick={() => setShowForm(true)}
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
              <table className="table-auto m-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Process ID</th>
                    <th className="px-4 py-2">Task ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {globalStore &&
                    globalStore.tasks &&
                    globalStore.tasks.map(
                      ({ processInstanceId, taskId, taskName }) => {
                        return (
                          <>
                            <tr>
                              <td className="border px-4 py-4">
                                {processInstanceId}
                              </td>
                              <td className="border px-4 py-4">{taskId}</td>
                              <td className="border px-4 py-4">{taskName}</td>
                              <td className="border px-4 py-4">
                                <Link
                                  to={`/workflow/${taskId}`}
                                  className="px-2 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
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
    </section>
  );
};
