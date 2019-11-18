import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const FlyoutMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const show = () => setIsOpen(true);
  const hide = () => setIsOpen(false);

  const display = isOpen ? "open" : "";

  return (
    <div>
      <button onClick={show} id="" className="collapse menu-toggle">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`modal-background ${display}`}>
        <button onClick={hide} className="close-menu-btn">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {/* {isOpen ? (
          <div className="modal-container">
            <div
              className="exit-modal"
              role="button"
              tabIndex="-1"
              onClick={hide}
            />

            <div className="text-center warning-text">adsfasdf</div>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};
