import { useState } from "react";
import { useTaskStore } from "./store/useTaskStore";
import KanbanBoard from "./components/KanbanBoard";
import TaskModal from "./components/TaskModal";
import TaskDetailModal from "./components/TaskDetailModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { deleteTask } = useTaskStore();

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
    setIsDetailModalOpen(false);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
      setIsDeleteModalOpen(false);
      setIsDetailModalOpen(false);
    }
  };

  const handleCloseModals = () => {
    setIsModalOpen(false);
    setIsDetailModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">SyncLife 칸반 보드</h1>
        <div className="header-actions">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="태스크 검색.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear-button" onClick={() => setSearchQuery("")} title="검색어 지우기">
                ×
              </button>
            )}
          </div>
          <button className="add-task-button" onClick={handleAddTask}>
            + 새 태스크 추가
          </button>
        </div>
      </header>

      <main className="app-main">
        <KanbanBoard searchQuery={searchQuery} onViewTask={handleViewTask} onEditTask={handleEditTask} onDeleteTask={handleDeleteClick} />
      </main>

      <TaskModal isOpen={isModalOpen} onClose={handleCloseModals} task={selectedTask} />

      <TaskDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        task={selectedTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteClick}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title}
      />
    </div>
  );
}

export default App;
