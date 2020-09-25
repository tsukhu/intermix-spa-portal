import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { BackSection } from "./back-section";

export const HistoryActionSection: React.FC<any> = (props) => {
  const [processing, setProcessing] = React.useState(false);

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
    if (id) {
      fetchTaskInstances(id).then((res: any) => {
        console.log(res);
      });
    }
  }, [id]);

  const { t } = useTranslation();

  return (
    <>
      {processing && (
        <section className="animate__animated animate__fadeIn inset-0 mt-20 sm:mt-16 sm:ml-56 absolute flex overflow-y-auto">
          Processing...
        </section>
      )}
      {!processing && (
        <section className="animate__animated animate__fadeIn inset-0 mt-20 sm:mt-16 sm:ml-56 absolute">
          <BackSection />
          <p>Task History Comes Here ... for {id}</p>
        </section>
      )}
    </>
  );
};
