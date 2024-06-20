import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import DeleteConfirmation from "../common/DeleteConfirmation";
import DepartmentForm from "./DepartmentForm";
import { Department } from "../../types";

const DepartmentList = () => {
  const axios = useAxios;
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
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
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`/Departments/${id}`)
      .then(() => {
        fetchDepartments();
        setDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("There was an error deleting the department!", error);
      });
  };

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setFormModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Departments</h1>
      <button
        onClick={() => setFormModalOpen(true)}
        className="mb-4 bg-blue-500 text-white p-2 rounded"
      >
        Add Department
      </button>
      <ul className="space-y-4">
        {departments.map((department) => (
          <li
            key={department.id}
            className="flex justify-between items-center border p-2 rounded-md"
          >
            <p>
              Department Id: <strong> {department.id}</strong>
            </p>

            <p>
              <strong>{department.name}</strong>
            </p>
            <div>
              <button
                onClick={() => handleEdit(department)}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setSelectedDepartment(department);
                  setDeleteModalOpen(true);
                }}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedDepartment && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setDeleteModalOpen(false)}
          onConfirmDelete={() => handleDelete(selectedDepartment.id)}
        />
      )}
      <DepartmentForm
        isOpen={isFormModalOpen}
        onRequestClose={() => {
          setFormModalOpen(false);
          setSelectedDepartment(null);
        }}
        department={selectedDepartment}
        onFormSubmit={fetchDepartments}
      />
    </div>
  );
};

export default DepartmentList;
