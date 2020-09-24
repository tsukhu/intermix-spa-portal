import React from "react";
import ReactBpmn from "react-bpmn";
import "./bpmn-section.scss";
import bpmnFile from "./data/PurchaseOrder.bpmn";

export const BpmnSection: React.FC<any> = (props) => {
  const inputEl = React.useRef(null);
  const [diagramXML, setDiagramXML] = React.useState(null);
  const [error, setError] = React.useState(null);
  const onShown = () => {
    const domel = inputEl.current.containerRef.current;
    const currentEl = domel.querySelector(
      `[data-element-id='${props.currentKey}']`
    );
    currentEl.firstElementChild.classList.add("intermix-active-task");
    const ApproveEl = domel.querySelector("[data-element-id='approvednotify']");
    ApproveEl.firstElementChild.classList.add("intermix-task");
    ApproveEl.firstElementChild.addEventListener("click", function() {
      props.onApproval();
    });
    const RejectEl = domel.querySelector("[data-element-id='rejectednotify']");
    RejectEl.firstElementChild.classList.add("intermix-task");
    RejectEl.firstElementChild.addEventListener("click", function() {
      props.onRejection();
    });
  };

  const onLoading = () => {
    console.log("diagram loading...");
  };

  const onError = () => {
    console.log("diagram error...");
  };

  React.useEffect(() => {
    try {
      fetch(bpmnFile)
        .then((res) => res.text())
        .then((diagramXML) => {
          setDiagramXML(diagramXML);
          setError(null);
        });
    } catch (e) {
      setError(e.message);
    }
  }, []);

  return (
    <>
      <section className="flex justify-center">
        {!diagramXML && !error && <p>Initializing bpmn ...</p>}
        {error && <p>{`Error Initializing bpmn : ${error}`}</p>}
        {diagramXML && (
          <div className="bg-white w-full border-gray-400 border border-dotted rounded mb-2 sm:m-4 sm:mt-1 sm:mb-1">
            <ReactBpmn
              diagramXML={diagramXML}
              onShown={onShown}
              onLoading={onLoading}
              onError={onError}
              ref={inputEl}
            />
          </div>
        )}
      </section>
    </>
  );
};
