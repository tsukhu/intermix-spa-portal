import React from "react";
import { ListSection } from "./list-section";
import { HistorySection } from "./history-section";

export const Workflows: React.FC<any> = (props) => {
  const [view, setView] = React.useState("active");
  const getClassesForView = (viewToCheck) => {
    return viewToCheck === view
      ? "text-white border-l border-t border-r rounded-t bg-blue-700"
      : "text-gray-500 hover:text-blue-800 cursor-pointer";
  };
  return (
    <>
      <section className="animate__animated animate__fadeIn inset-0 mt-20 sm:ml-56 absolute flex overflow-y-auto flex-col m-2 mr-4">
        <ul className="flex border-b-2 uppercase text-xs">
          <li className="-mb-px mr-1">
            <div
              onClick={() => setView("active")}
              className={`${getClassesForView(
                "active"
              )} bg-white inline-block py-2 px-4`}
            >
              Active
            </div>
          </li>
          <li className="mr-1">
            <div
              onClick={() => setView("completed")}
              className={`${getClassesForView(
                "completed"
              )} bg-white inline-block py-2 px-4`}
            >
              Completed
            </div>
          </li>
        </ul>
        <div className="bg-gray-200 flex flex-grow-1 flex-col">
          {view === "active" && (
            <section className="animate__animated animate__fadeIn">
              <ListSection {...props} />
            </section>
          )}
          {view === "completed" && (
            <section className="animate__animated animate__fadeIn">
              <HistorySection {...props} />
            </section>
          )}
        </div>
      </section>
    </>
  );
};
