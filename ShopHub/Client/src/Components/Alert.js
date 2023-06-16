import React from "react";

const Alert = (props) => {
  const setprev = (props) => {
    if (props.alert.type === "danger") {
      return "ERROR :";
    } else {
      return "";
    }
  };
  return (
    <div>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type}`}
          role="alert"
          style={{ textAlign: "center" }}
        >
          <b style={{ fontSize: "20px" }}>
            {setprev(props)} {props.alert.msg}
          </b>
        </div>
      )}
    </div>
  );
};

export default Alert;
