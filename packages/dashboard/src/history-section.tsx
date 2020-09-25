import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

export const HistorySection: React.FC<any> = (props) => {
  const { t } = useTranslation();
  const [historicItems, setHistoricItems] = React.useState([]);

  const millSecondsToWords = (timeInMilliSeconds) => {
    const seconds = (timeInMilliSeconds / 1000).toFixed(0);
    const minutes = (seconds / 60).toFixed(0);
    const hours = (minutes / 60).toFixed(0);
    const days = (hours / 24).toFixed(0);
    return `${days > 0 ? `${days} days` : ""} ${
      hours > 0 ? `${hours} hours` : ""
    } ${minutes > 0 ? `${minutes % 60} minutes` : ""} ${
      seconds ? `${seconds % 60} seconds` : ""
    }
    `;
    // ${${hours % 24 + ":" + minutes % 60 + ":" + seconds % 60`;
  };
  const fetchTasks = async () => {
    return await (
      await fetch(
        `${props.wfApiUrl}/process-api/query/historic-process-instances`,
        {
          method: "post",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({}),
        }
      )
    ).json();
  };

  React.useEffect(() => {
    fetchTasks().then((res: any) => {
      const items = res.data;
      setHistoricItems(items.filter((i: any) => i.endTime !== null));
    });
  }, []);
  return (
    <div className="px-4 py-6 sm:px-0 flex-grow-1 flex-shrink-1 justify-center rounded-lg">
      <div
        className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 m-2 mx-12 rounded"
        role="alert"
      >
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
        </svg>
        <p>{`${t("Tasks Completed")} ...`}</p>
      </div>

      <section className="animate__animated animate__fadeIn inset-0 ">
        <div className="bg-white relative ml-4 sm:ml-16 sm:mr-16 p-4 flex justify-center border-gray-100 border border-dotted  rounded">
          <table className="table-auto m-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Process ID</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Start Time</th>
                <th className="px-4 py-2">End Time</th>
                <th className="px-4 py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {historicItems.map(
                ({
                  id,
                  processDefinitionName,
                  startTime,
                  endTime,
                  durationInMillis,
                }) => {
                  return (
                    <>
                      <tr>
                        <td className="border px-4 py-4">{id}</td>
                        <td className="border px-4 py-4">
                          {processDefinitionName}
                        </td>
                        <td className="border px-4 py-4">{`${format(
                          new Date(startTime),
                          "MM/dd/yyyy"
                        )}`}</td>
                        <td className="border px-4 py-4">{`${format(
                          new Date(endTime),
                          "MM/dd/yyyy"
                        )}`}</td>
                        <td className="border px-4 py-4">{`${millSecondsToWords(
                          durationInMillis
                        )}`}</td>
                        <td className="border px-4 py-4">
                          <Link
                            to={`/workflow/history/${id}`}
                            className="px-2 py-2 border-blue-500 border text-blue-500 text-sm rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
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
    </div>
  );
};
