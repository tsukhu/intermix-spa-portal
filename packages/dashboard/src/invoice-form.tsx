import React from "react";
import { useForm } from "react-hook-form";

export const InvoiceForm: React.FC<any> = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    props.handleSubmit({
      type: props.type,
      reviewreq: data.reviewreq ? data.reviewreq : false,
      comment: data.comment ? data.comment : "",
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
