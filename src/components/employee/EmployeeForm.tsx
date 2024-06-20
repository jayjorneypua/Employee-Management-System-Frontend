import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Modal from "../common/Modal";
import { Department, Position, Employee } from "../../types";

interface EmployeeFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  employee?: Employee | null;
  onFormSubmit: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  isOpen,
  onRequestClose,
  employee,
  onFormSubmit,
}) => {
  const axios = useAxios;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [positionId, setPositionId] = useState<number | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    axios
      .get("/Departments")
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error("Error fetching departments:", error));

    axios
      .get("/Positions")
      .then((response) => setPositions(response.data))
      .catch((error) => console.error("Error fetching positions:", error));

    if (employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setDepartmentId(employee.departmentId);
      setPositionId(employee.positionId);
      setProfilePicture(null); // Reset profile picture
    }
  }, [employee]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    if (departmentId !== null)
      formData.append("departmentId", departmentId.toString());
    if (positionId !== null)
      formData.append("positionId", positionId.toString());
    if (profilePicture) formData.append("profilePicture", profilePicture);

    const request = employee?.id
      ? axios.put(`/Employees/${employee.id}`, formData)
      : axios.post("/Employees", formData);

    request
      .then(() => {
        onRequestClose();
        onFormSubmit();
        setFirstName("");
        setLastName("");
        setEmail("");
        setDepartmentId(null);
        setPositionId(null);
        setProfilePicture(null);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Employee Form"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <select
            value={positionId ?? ""}
            onChange={(e) => setPositionId(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Position</option>
            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            onChange={(e) =>
              setProfilePicture(e.target.files ? e.target.files[0] : null)
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {employee ? "Update Employee" : "Create Employee"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeForm;
