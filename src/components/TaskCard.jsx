import { useRef } from "react";
import "./TaskCard.css";

const TaskCard = ({ task, onView, onEdit, onDelete }) => {
  const isDraggingRef = useRef(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleMouseDown = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = () => {
    isDraggingRef.current = true;
  };

  const handleClick = (e) => {
    // 드래그 중이 아닐 때만 상세 보기 열기
    if (!isDraggingRef.current && onView) {
      onView(task);
    }
    isDraggingRef.current = false;
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(task);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(task);
    }
  };

  return (
    <div
      className={`task-card ${getPriorityColor(task.priority)}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`priority-badge ${getPriorityColor(task.priority)}`}>{task.priority}</span>
      </div>
      {task.description && <p className="task-description">{task.description}</p>}
      {task.tags && task.tags.length > 0 && (
        <div className="task-tags">
          {task.tags.map((tag) => (
            <span key={tag} className="task-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="task-card-footer">
        <span className="task-date">{formatDate(task.createdAt)}</span>
        <div className="task-card-actions">
          {onEdit && (
            <button className="task-action-btn edit-btn" onClick={handleEditClick} title="수정">
              ✏️
            </button>
          )}
          {onDelete && (
            <button className="task-action-btn delete-btn" onClick={handleDeleteClick} title="삭제">
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
