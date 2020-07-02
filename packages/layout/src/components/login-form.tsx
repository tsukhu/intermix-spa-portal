import * as React from "react";
import { LogoSVG } from "./logo";

export interface LoginFormProps {
  onSuccess: (val: any) => any;
}

export const LoginForm = ({ onSuccess }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSuccess(true);
  };

  return (
    <div className="animate__animated  animate__fadeIn font-sans antialiased leading-normal tracking-normal bg-gray-600 h-screen w-screen absolute top-0 left-0 z-50">
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div
          className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
          style={{ height: "500px" }}
        >
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <div className="flex flex-col flex-1 justify-center mb-8 text-left align-middle">
              <div className="pl-10">
                <LogoSVG />
              </div>

              <div className="w-full mt-4">
                <form
                  className="form-horizontal w-3/4 mx-auto"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col mt-4">
                    <input
                      id="email"
                      type="text"
                      className="flex-grow h-8 px-2 border rounded border-gray-400"
                      name="email"
                      readOnly
                      value="cody.cook@mymail.com"
                      placeholder="Email"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      id="password"
                      type="password"
                      className="flex-grow h-8 px-2 rounded border border-gray-400"
                      name="password"
                      value="test"
                      readOnly
                      placeholder="Password"
                    />
                  </div>
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      className="mr-2"
                      checked
                      readOnly
                    />{" "}
                    <label className="text-sm text-gray-500">Remember Me</label>
                  </div>
                  <div className="flex flex-col mt-8">
                    <button
                      type="submit"
                      className="bg-gray-800 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4 border-b-2 border-gray-500 m-0 mr-4 ml-4 mb-2">
                  <a
                    className="no-underline hover:underline text-blue-800 text-xs"
                    href="#"
                  >
                    Forgot Your Password?
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hidden md:block md:w-1/2 rounded-r-lg"
            style={{
              background:
                "url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
