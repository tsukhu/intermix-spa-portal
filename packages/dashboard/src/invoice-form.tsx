import React from "react";
import { useForm } from "react-hook-form";

export const InvoiceForm: React.FC<any> = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    props.handleSubmit({
      type: props.type,
      reviewreq: data.reviewreq ? data.reviewreq : false,
      comment: data.comment ? data.comment : "",
      status: data.status ? data.status : "",
    });
  };
  return (
    <section className="animate__animated animate__fadeIn inset-0 mt-8 ml-16 flex  justify-center">
      <div className="leading-loose w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl align-center m-4 p-10 bg-white border-gray-400 border rounded shadow-xl"
        >
          <p className="text-gray-800 font-bold">Invoice Information</p>
          {props.type === "generate_invoice" && (
            <div className="mt-2">
              <label className="block text-sm text-gray-700" htmlFor="comment">
                Comment
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="comment"
                type="text"
                placeholder="Add Comments"
                aria-label="status"
                name="comment"
                defaultValue=""
                ref={register({ required: true })}
              />
              {errors.status && <span>This field is required</span>}
            </div>
          )}
          {props.type === "review_invoice" && (
            <div className="mt-2">
              <label className="text-sm text-gray-700" htmlFor="reviewreq">
                Review Required
              </label>
              <input
                className="m-2"
                id="reviewreq"
                type="checkbox"
                placeholder="Task Details"
                aria-label="review required"
                name="reviewreq"
                defaultValue=""
                ref={register}
              />
              {errors.status && <span>This field is required</span>}
            </div>
          )}
          {props.type === "change_status" && (
            <div className="mt-2">
              <label className="block text-sm text-gray-700" htmlFor="status">
                Change Invoice Status
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="status"
                  ref={register({ required: true })}
                >
                  <option value="close">Close</option>
                  <option value="pending">Pending</option>
                  <option value="reject">Reject</option>
                  <option value="others">Others</option>
                  <option value="open">Open</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors.status && <span>This field is required</span>}
            </div>
          )}
          {/* errors will return when field validation fails  */}
          <div className="flex justify-evenly">
            <div className="mt-4">
              <button
                className="align-center px-1 py-1 border-blue-500 border text-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
                onClick={() => props.handleClose(false)}
              >
                Cancel
              </button>
            </div>
            <div className="mt-4 ">
              <button
                className="align-center px-1 py-1 border-blue-500 border text-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
                type="submit"
                disabled={errors === null}
              >
                Complete
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
