import React from "react";
import Modal from "./Modal";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirmDelete: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  onRequestClose,
  onConfirmDelete,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
    >
      <div className="p-4">
        <h2 className="text-xl mb-4">
          Are you sure you want to delete this item?
        </h2>
        <div className="flex justify-end">
          <button
            onClick={onRequestClose}
            className="mr-2 bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmDelete}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
