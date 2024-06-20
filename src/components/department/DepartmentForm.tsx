import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Modal from "../common/Modal";
import { Department } from "../../types";

interface DepartmentFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  department?: Department | null;
  onFormSubmit: () => void;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  isOpen,
  onRequestClose,
  department,
  onFormSubmit,
}) => {
  const axios = useAxios;
  const [name, setName] = useState("");

  useEffect(() => {
    if (department) {
      setName(department.name);
    }
  }, [department]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const departmentData = {
      id: department?.id,
      name,
    };

    const request = department?.id
      ? axios.put(`/Departments/${department.id}`, departmentData)
      : axios.post("/Departments", { name });

    request
      .then(() => {
        onRequestClose();
        onFormSubmit();
        setName("");
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Department Form"
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {department ? "Update Department" : "Create Department"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DepartmentForm;
