import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import DeleteConfirmation from "../common/DeleteConfirmation";
import EmployeeForm from "./EmployeeForm";
import { Employee, Department, Position } from "../../types";

const EmployeeList = () => {
  const axios = useAxios;
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchPositions();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("/Employees")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setEmployees(response.data);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });
  };

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

  const fetchPositions = () => {
    axios
      .get("/Positions")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPositions(response.data);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the positions!", error);
      });
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`/Employees/${id}`)
      .then(() => {
        fetchEmployees();
        setDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("There was an error deleting the employee!", error);
      });
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormModalOpen(true);
  };

  const getDepartmentName = (id: number) => {
    const department = departments.find((dep) => dep.id === id);
    return department ? department.name : "Unknown";
  };

  const getPositionTitle = (id: number) => {
    const position = positions.find((pos) => pos.id === id);
    return position ? position.title : "Unknown";
  };

  const getProfilePictureUrl = (path: string | undefined) => {
    return path
      ? `http://localhost:5159${path}`
      : "https://via.placeholder.com/150";
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Employees</h1>
      <button
        onClick={() => setFormModalOpen(true)}
        className="mb-4 bg-blue-500 text-white p-2 rounded"
      >
        Add Employee
      </button>
      <ul className="space-y-4">
        {employees.map((employee) => (
          <li key={employee.id} className="border p-4 rounded-md">
            <div className="flex items-center space-x-4">
              <img
                src={getProfilePictureUrl(employee.profilePicturePath)}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p>
                  <strong>Employee ID:</strong> {employee.id}
                </p>
                <p>
                  <strong>First Name:</strong> {employee.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {employee.lastName}
                </p>
                <p>
                  <strong>Email address:</strong> {employee.email}
                </p>
                <p>
                  <strong>Department:</strong>{" "}
                  {getDepartmentName(employee.departmentId)}
                </p>
                <p>
                  <strong>Position:</strong>{" "}
                  {getPositionTitle(employee.positionId)}
                </p>
              </div>
              <div className="ml-auto flex space-x-2">
                <button
                  onClick={() => handleEdit(employee)}
                  className="bg-yellow-500 text-white p-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setDeleteModalOpen(true);
                  }}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedEmployee && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setDeleteModalOpen(false)}
          onConfirmDelete={() => handleDelete(selectedEmployee.id)}
        />
      )}
      <EmployeeForm
        isOpen={isFormModalOpen}
        onRequestClose={() => {
          setFormModalOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        onFormSubmit={fetchEmployees}
      />
    </div>
  );
};

export default EmployeeList;
