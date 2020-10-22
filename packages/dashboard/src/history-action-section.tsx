import React from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { BackSection } from "./back-section";
import { BpmnSection } from "./bpmn-section";

export const HistoryActionSection: React.FC<any> = (props) => {
  const [processing, setProcessing] = React.useState(false);
  const [taskHistory, setTaskHistory] = React.useState([]);

  const { id } = useParams();

  const fetchTaskInstances = async (id) => {
    return await (
      await fetch(
        `${props.wfApiUrl}/process-api/query/historic-task-instances`,
        {
          method: "post",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            processInstanceId: id,
          }),
        }
      )
    ).json();
  };

  React.useEffect(() => {
    setProcessing(true);
    if (id) {
      fetchTaskInstances(id).then((res: any) => {
        setProcessing(false);
        const intermediateData = res.data;
        const finalData = intermediateData.map((item: any) => ({
          ...item,
          type: item.name
            .trim()
            .toLowerCase()
            .includes("po submitted")
            ? "po_order"
            : "po_invoice",
        }));
        finalData.sort(function(a, b) {
          const aDate: any = new Date(a.startTime);
          const bDate: any = new Date(b.startTime);
          return aDate - bDate
        });
        setTaskHistory(finalData);
      });
    }
  }, [id]);

  const { t } = useTranslation();
  console.log(taskHistory);
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
          <section className="animate__animated animate__fadeIn inset-0 ">
            <div className="bg-white relative ml-4 sm:ml-16 sm:mr-16 p-4 flex justify-center border-gray-100 border border-dotted  rounded">
              <table className="border-collapse w-full text-sm">
                <thead>
                  <tr>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      #
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Task
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Start Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taskHistory.map(
                    ({ name, startTime, type, taskDefinitionKey }, index) => {
                      return (
                        <>
                          <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                #
                              </span>
                              <span className="ml-24 lg:ml-0">{index + 1}</span>
                            </td>

                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                Task
                              </span>
                              <span className="ml-24 lg:ml-0">{name}</span>
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                Start Time
                              </span>
                              <span className="ml-16 lg:ml-0">
                                {`${format(
                                  new Date(startTime),
                                  "MM/dd/yyyy  HH:mm:ss.SSS"
                                )}`}
                                {type === "po_invoice" && (
                                  <BpmnSection
                                    {...props}
                                    type={type}
                                    currentKey={taskDefinitionKey}
                                  />
                                )}
                              </span>
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
        </section>
      )}
    </>
  );
};
