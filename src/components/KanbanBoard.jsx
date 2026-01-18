import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import TaskCard from "./TaskCard";
import "./KanbanBoard.css";

const KanbanBoard = ({ searchQuery = "", onViewTask, onEditTask, onDeleteTask }) => {
  const { tasks, updateTaskStatus } = useTaskStore();
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const columns = [
    { id: "todo", title: "To Do", status: "todo" },
    { id: "inProgress", title: "In Progress", status: "inProgress" },
    { id: "done", title: "Done", status: "done" },
  ];

  const getTasksByStatus = (status) => {
    let filteredTasks = tasks.filter((task) => task.status === status);

    // 검색어가 있으면 제목으로 필터링
    if (searchQuery.trim()) {
      filteredTasks = filteredTasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return filteredTasks;
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.effectAllowed = "move";
    setDraggedTaskId(taskId);
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e, columnStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(columnStatus);
  };

  const handleDragLeave = (e) => {
    // 자식 요소로 이동할 때는 드래그 리브 이벤트가 발생하지 않도록
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      updateTaskStatus(taskId, newStatus);
    }
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <div
          key={column.id}
          className={`kanban-column ${dragOverColumn === column.status ? "drag-over" : ""}`}
          onDragOver={(e) => handleDragOver(e, column.status)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, column.status)}
        >
          <div className="column-header">
            <h2 className="column-title">{column.title}</h2>
            <span className="task-count">{getTasksByStatus(column.status).length}</span>
          </div>
          <div className="column-content">
            {getTasksByStatus(column.status).length === 0 ? (
              <div className="empty-column-message">{searchQuery ? "검색 결과가 없습니다" : "태스크가 없습니다"}</div>
            ) : (
              getTasksByStatus(column.status).map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={handleDragEnd}
                  className={draggedTaskId === task.id ? "dragging" : ""}
                >
                  <TaskCard task={task} onView={onViewTask} onEdit={onEditTask} onDelete={onDeleteTask} />
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
