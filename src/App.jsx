import { useState } from "react";
import { useTaskStore } from "./store/useTaskStore";
import KanbanBoard from "./components/KanbanBoard";
import TaskModal from "./components/TaskModal";
import TaskDetailModal from "./components/TaskDetailModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import FilterPanel from "./components/FilterPanel";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    priorities: [],
    statuses: [],
    tags: [],
  });
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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      priorities: [],
      statuses: [],
      tags: [],
    });
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
        <div className="priority-legend">
          <span className="legend-title">우선순위 색상:</span>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-color high"></span>
              <span className="legend-text">High</span>
            </div>
            <div className="legend-item">
              <span className="legend-color medium"></span>
              <span className="legend-text">Medium </span>
            </div>
            <div className="legend-item">
              <span className="legend-color low"></span>
              <span className="legend-text">Low</span>
            </div>
          </div>
        </div>
        <div className="main-content">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
          <KanbanBoard
            searchQuery={searchQuery}
            filters={filters}
            onViewTask={handleViewTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteClick}
          />
        </div>
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
