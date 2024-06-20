import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import DeleteConfirmation from "../common/DeleteConfirmation";
import PositionForm from "./PositionForm";
import { Position } from "../../types";

const PositionList = () => {
  const axios = useAxios;
  const [positions, setPositions] = useState<Position[]>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );

  useEffect(() => {
    fetchPositions();
  }, []);

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
      .delete(`/Positions/${id}`)
      .then(() => {
        fetchPositions();
        setDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("There was an error deleting the position!", error);
      });
  };

  const handleEdit = (position: Position) => {
    setSelectedPosition(position);
    setFormModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Positions</h1>
      <button
        onClick={() => setFormModalOpen(true)}
        className="mb-4 bg-blue-500 text-white p-2 rounded"
      >
        Add Position
      </button>
      <ul className="space-y-4">
        {positions.map((position) => (
          <li
            key={position.id}
            className="flex justify-between items-center border p-2 rounded-md"
          >
            {position.title}
            <div>
              <button
                onClick={() => handleEdit(position)}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setSelectedPosition(position);
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
      {selectedPosition && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setDeleteModalOpen(false)}
          onConfirmDelete={() => handleDelete(selectedPosition.id)}
        />
      )}
      <PositionForm
        isOpen={isFormModalOpen}
        onRequestClose={() => {
          setFormModalOpen(false);
          setSelectedPosition(null);
        }}
        position={selectedPosition}
        onFormSubmit={fetchPositions}
      />
    </div>
  );
};

export default PositionList;
