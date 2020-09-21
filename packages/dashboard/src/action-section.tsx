import React from "react";
import { navigateToUrl } from "single-spa";
import { getGlobalStore } from "@intermix/store";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { BackSection } from "./back-section";

export const ActionSection: React.FC<any> = (props) => {
  const store = getGlobalStore();
  const [globalStore, setGlobalStore] = React.useState(getGlobalStore());
  const [processing, setProcessing] = React.useState(false);

  const [task, setTask] = React.useState(null);
  const { id } = useParams();
  React.useLayoutEffect(() => {
    globalStore.subscribe(setGlobalStore);
  }, []);

  const fetchPostTaskApprove = async ({ id, approved }) => {
    return await await fetch(
      `${props.wfApiUrl}/PO/approve/tasks/${id}/${approved}`,
      {
        method: "post",
        headers: {
          accept: "*/*",
        },
      }
    );
  };

  const handleApproval = (id, approved) => {
    try {
      setProcessing(true);
      fetchPostTaskApprove({ id, approved }).then(() => {
        store.setTasksUpdated(true);
        navigateToUrl("/workflow");
      });
    } catch {
      setProcessing(false);
    }
  };

  ///PO/approve/tasks/ss/true
  React.useEffect(() => {
    if (globalStore && globalStore.tasks) {
      const task = globalStore.tasks.find((item) => item.taskId === id);
      if (task) {
        let details;

        if (task && task.taskData) {
          details = Object.entries(task.taskData).map((data) => ({
            key: data[0],
            value: data[1],
          }));
        }
        setTask({ taskId: task.taskId, taskName: task.taskName, details });
      }
    }
  }, [globalStore, id]);

  const { t } = useTranslation();

  return (
    <>
      {processing && (
        <section className="animate__animated animate__fadeIn inset-0 mt-20 sm:mt-16 sm:ml-56 absolute">
          Processing...
        </section>
      )}
      {!processing && (
        <section className="animate__animated animate__fadeIn inset-0 mt-20 sm:mt-16 sm:ml-56 absolute">
          <BackSection />
          {task && (
            <div className="flex mx-4 my-4">
              <div className="border rounded w-full bg-white">
                <div className="p-4">
                  <h5 className="text-sm text-gray-500 font-bold tracking-widest mb-2 uppercase">
                    {`Task ID: ${task.taskId}`}
                  </h5>
                  <p>{task.taskName}</p>
                  {task.details &&
                    task.details.map(({ key, value }, i) => (
                      <p key={`${key}-${i}`}>{`${key} : ${value}`}</p>
                    ))}
                  <button
                    onClick={() => handleApproval(task.taskId, true)}
                    className="px-2 py-2 m-4 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(task.taskId, false)}
                    className="px-2 py-2 m-4 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};
