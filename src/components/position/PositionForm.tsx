import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Modal from "../common/Modal";
import { Department, Position } from "../../types";

interface PositionFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  position?: Position | null;
  onFormSubmit: () => void;
}

const PositionForm: React.FC<PositionFormProps> = ({
  isOpen,
  onRequestClose,
  position,
  onFormSubmit,
}) => {
  const axios = useAxios;
  const [title, setTitle] = useState("");
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    axios
      .get("/Departments")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDepartments(response.data);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the departments!", error);
      });

    if (position) {
      setTitle(position.title);
      setDepartmentId(position.departmentId);
    }
  }, [position]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const positionData = {
      id: position?.id,
      title,
      departmentId: departmentId !== null ? departmentId : undefined,
    };

    const request = position?.id
      ? axios.put(`/Positions/${position.id}`, positionData)
      : axios.post("/Positions", { title, departmentId });

    request
      .then(() => {
        onRequestClose();
        onFormSubmit();
        setTitle("");
        setDepartmentId(null);
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Position Form"
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            value={departmentId ?? ""}
            onChange={(e) => setDepartmentId(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {position ? "Update Position" : "Create Position"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PositionForm;
