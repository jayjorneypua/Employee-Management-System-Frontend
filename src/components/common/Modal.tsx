import React from "react";
import ReactModal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
}

ReactModal.setAppElement("#root"); // Make sure to set the app element for accessibility

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <button onClick={onRequestClose} className="modal-close-button">
          X
        </button>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
