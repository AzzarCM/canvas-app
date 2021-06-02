import React from "react";

export const findStatus = (status) => {
    switch (status) {
      case "EN PROCESO":
        return "status pending";
      case "CONFIRMADA":
        return "status confirmed";
      case "ENTREGADA":
        return "status delivered";
      case "EN CAMINO":
        return "status shipped";
      default:
        return "";
    }
  };

  export const statuses = [
    { value: "EN PROCESO", label: "EN PROCESO" },
    { value: "CONFIRMADA", label: "CONFIRMADA" },
    { value: "EN CAMINO", label: "EN CAMINO" },
    { value: "ENTREGADA", label: "ENTREGADA" },
  ];

  export const progressOrderBar = (status) => {
    switch (status) {
      case "EN PROCESO":
      case "PENDIENTE":
        return (
          <>
            <li className="active step0"></li>
            <li className="step0"></li>
            <li className="step0"></li>
            <li className="step0"></li>
          </>
        );
      case "CONFIRMADA":
        return (
          <>
            <li className="active step0"></li>
            <li className="active step0"></li>
            <li className="step0"></li>
            <li className="step0"></li>
          </>
        );
      case "EN CAMINO":
        return (
          <>
            <li className="active step0"></li>
            <li className="active step0"></li>
            <li className="active step0"></li>
            <li className="step0"></li>
          </>
        );
      case "ENTREGADA":
        return (
          <>
            <li className="active step0"></li>
            <li className="active step0"></li>
            <li className="active step0"></li>
            <li className="active step0"></li>
          </>
        );
      default:
        return (
          <>
            <li className="step0"></li>
            <li className="step0"></li>
            <li className="step0"></li>
            <li className="step0"></li>
          </>
        );
    }
  };