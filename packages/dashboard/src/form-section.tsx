import React from "react";
import { useForm } from "react-hook-form";

export const FormSection: React.FC<any> = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [processing, setProcessing] = React.useState(false);
  const getID = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return (
      "Task_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };

  const fetchDeploymentId = async () => {
    return await (
      await fetch(`${props.wfApiUrl}/deploy`, {
        method: "post",
      })
    ).json();
  };

  const fetchPostTask = async ({ deploymentId, drillbackurl, id, status }) => {
    return await (
      await fetch(`${props.wfApiUrl}/PO/posubmit`, {
        method: "post",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deploymentId, drillbackurl, id, status }),
      })
    ).json();
  };

  const onSubmit = (data) => {
    const { status } = data;
    setProcessing(true);
    const id = getID();
    try {
      fetchDeploymentId().then((result) => {
        const deploymentId = result.processDefId;
        fetchPostTask({ deploymentId, drillbackurl, id, status }).then(
          (result) => {
            props.handleSubmit(true);
          }
        );
      });
    } catch (e) {
      console.log(e);
      props.handleSubmit(false);
    }
  };

  const drillbackurl = "http://localhost:9000/workflow";
  ////  "deploymentId": "c71a3901-fbdd-11ea-adae-ba75e4cfd728",
  //  "drillbackurl": "string",

  return (
    <>
      {processing && (
        <section className="animate__animated animate__fadeIn inset-0 mt-8 ml-16 flex  justify-center">
          Processing...
        </section>
      )}
      {!processing && (
        <section className="animate__animated animate__fadeIn inset-0 mt-8 ml-16 flex  justify-center">
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <div className="leading-loose w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-xl align-center m-4 p-10 bg-white rounded shadow-xl"
            >
              <p className="text-gray-800 font-medium">Task information</p>
              {/* register your input into the hook by invoking the "register" function */}
              {/* 
            <div className="">
              <label className="block text-sm text-gray-700" htmlFor="taskId">
                Task ID
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded hidden"
                id="taskId"
                type="text"
                placeholder="Auto Generated ID"
                aria-label="taskId"
                name="taskId"
                defaultValue={getID()}
                ref={register({ required: true })}
              />
            </div> */}
              <div className="mt-2">
                <label className="block text-sm text-gray-700" htmlFor="status">
                  Task Details
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="status"
                  type="text"
                  placeholder="Task Details"
                  aria-label="status"
                  name="status"
                  defaultValue=""
                  ref={register({ required: true })}
                />
                {errors.status && <span>This field is required</span>}
              </div>
              {/* errors will return when field validation fails  */}

              <div className="flex mt-4 justify-end">
                <button
                  className="align-center px-1 py-1 border-blue-500 border text-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};
