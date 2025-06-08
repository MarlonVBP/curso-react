import { ChevronRightIcon, TrashIcon, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick, onEditTaskSubmit }) {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  function handleEditClick(task) {
    setSelectedTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsModalOpen(true);
  }

  function handleSaveClick() {
    onEditTaskSubmit(selectedTask.id, editTitle, editDescription);
    setIsModalOpen(false);
  }

  function handleCancelClick() {
    setIsModalOpen(false);
  }

  function onSeeDetailsClick(title, description) {
    const query = new URLSearchParams();
    query.set("title", title);
    query.set("description", description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <div>
      <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        {tasks.map((task) => (
          <li key={task.id} className="flex gap-2">
            <button
              onClick={() => onTaskClick(task.id)}
              className={`w-full bg-slate-400 text-left text-white p-2 rounded-md ${
                task.isCompleted && "line-through opacity-50"
              }`}
            >
              {task.title}
            </button>
            <button
              onClick={() => onSeeDetailsClick(task.title, task.description)}
              className="bg-slate-400 p-2 rounded-md text-white"
            >
              <ChevronRightIcon />
            </button>
            <button
              onClick={() => onDeleteTaskClick(task.id)}
              className="bg-red-400 p-2 rounded-md text-white"
            >
              <TrashIcon />
            </button>
            <button
              onClick={() => handleEditClick(task)}
              className="bg-blue-400 p-2 rounded-md text-white"
            >
              <Pencil />
            </button>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-[400px] space-y-4 relative">
            <button
              onClick={handleCancelClick}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
            <h2 className="text-xl font-bold text-center">Editar Tarefa</h2>
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Título"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Descrição"
              />
            </div>
            <div className="flex justify-between space-x-2">
              <button
                onClick={handleCancelClick}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
