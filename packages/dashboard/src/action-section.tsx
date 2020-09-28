import React from "react";
import { navigateToUrl } from "single-spa";
import { getGlobalStore } from "@intermix/store";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BpmnSection } from "./bpmn-section";
import { BackSection } from "./back-section";
import { InvoiceForm } from "./invoice-form";

export const ActionSection: React.FC<any> = (props) => {
  const store = getGlobalStore();
  const [globalStore, setGlobalStore] = React.useState(getGlobalStore());
  const [processing, setProcessing] = React.useState(false);
  const [invoiceForm, setInvoiceForm] = React.useState(null);

  const [task, setTask] = React.useState(null);
  const { id } = useParams();
  React.useLayoutEffect(() => {
    globalStore.subscribe(setGlobalStore);
  }, []);

  const fetchPostTaskApprove = async ({ id, approved }) => {
    return await await fetch(
      `${props.wfApiUrl}/PO/posubmit/tasks/${id}/${approved}`,
      {
        method: "post",
        headers: {
          accept: "*/*",
        },
      }
    );
  };

  const fetchPostReviewTask = async (id, reviewreq) => {
    return await await fetch(
      `${props.wfApiUrl}/PO/review/tasks/${id}/${reviewreq}`,
      {
        method: "post",
        headers: {
          accept: "*/*",
        },
      }
    );
  };

  const fetchPostGenerateInvoiceTask = async (id, comment) => {
    const postUrl = `${props.wfApiUrl}/PO/invoice/tasks/${id}/${comment}`;
    const encodedUrl = encodeURI(postUrl);
    return await await fetch(`${encodedUrl}`, {
      method: "post",
      headers: {
        accept: "*/*",
      },
    });
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

  const handleInvoiceWF = (id, { comment, reviewreq, type }) => {
    try {
      setProcessing(true);
      if (type === "review_invoice") {
        fetchPostReviewTask(id, reviewreq).then(() => {
          store.setTasksUpdated(true);
          navigateToUrl("/workflow");
        });
      } else {
        fetchPostGenerateInvoiceTask(id, comment).then(() => {
          store.setTasksUpdated(true);
          navigateToUrl("/workflow");
        });
      }
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
        setTask({
          processInstanceId: task.processInstanceId,
          processDefByKey: task.processDefByKey,
          taskId: task.taskId,
          taskName: task.taskName,
          type: task.taskName
            .trim()
            .toLowerCase()
            .includes("po submitted")
            ? "po_order"
            : "po_invoice",
          details,
        });
      }
    }
  }, [globalStore, id]);

  const { t } = useTranslation();
  console.log(task);
  return (
    <>
      {processing && (
        <section className="animate__animated animate__fadeIn inset-0 mt-20 sm:mt-16 sm:ml-56 absolute flex overflow-y-auto">
          Processing...
        </section>
      )}
      {!processing && (
        <section className="animate__animated animate__fadeIn inset-0 mt-20 sm:mt-16 sm:ml-56 absolute flex flex-col overflow-y-auto">
          <BackSection />

          {task && (
            <>
              <BpmnSection
                {...props}
                type={task.type}
                currentKey={task.processDefByKey}
                onApproval={() => handleApproval(task.taskId, true)}
                onRejection={() => handleApproval(task.taskId, false)}
              />
              <div className="flex mx-4 my-4">
                <div className="border rounded w-full bg-white">
                  <div className="p-4">
                    <h5 className="text-sm text-gray-500 font-bold tracking-widest mb-2 uppercase">
                      {`Process ID: ${task.processInstanceId}`}
                    </h5>
                    <p>{`${task.taskName} : ${task.taskId}`}</p>
                    {task.details &&
                      task.details.map(({ key, value }, i) => (
                        <p key={`${key}-${i}`}>{`${key} : ${value}`}</p>
                      ))}
                    {(task.type === "po_order" ||
                      task.processDefByKey === "posubmitted") && (
                      <>
                        <button
                          onClick={() => handleApproval(task.taskId, true)}
                          className="px-2 py-2 m-4 border-green-500 border text-green-500 rounded  hover:bg-green-700 hover:text-white focus:outline-none transition duration-300"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproval(task.taskId, false)}
                          className="px-2 py-2 m-4 border-red-500 border text-red-500 rounded  hover:bg-red-700 hover:text-white focus:outline-none transition duration-300"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {task.type === "po_invoice" &&
                      task.processDefByKey !== "posubmitted" && (
                        <>
                          {task.processDefByKey === "GenerateInvoice" && (
                            <button
                              onClick={() =>
                                setInvoiceForm({ type: "generate_invoice" })
                              }
                              className="px-2 py-2 m-4 border-green-500 border text-green-500 rounded  hover:bg-green-700 hover:text-white focus:outline-none transition duration-300"
                            >
                              Generate Invoice
                            </button>
                          )}
                          {task.processDefByKey.toLowerCase() === "reviewresubmit" && (
                            <button
                              onClick={() =>
                                setInvoiceForm({ type: "review_invoice" })
                              }
                              className="px-2 py-2 m-4 border-red-500 border text-red-500 rounded  hover:bg-red-700 hover:text-white focus:outline-none transition duration-300"
                            >
                              Submit For Review
                            </button>
                          )}
                          {invoiceForm && (
                            <InvoiceForm
                              type={invoiceForm.type}
                              handleClose={() => setInvoiceForm(null)}
                              handleSubmit={(data) =>
                                handleInvoiceWF(task.taskId, data)
                              }
                            />
                          )}
                        </>
                      )}
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
};
