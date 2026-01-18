import "./TaskDetailModal.css";

const TaskDetailModal = ({ isOpen, onClose, task, onEdit, onDelete }) => {
  if (!isOpen || !task) return null;

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
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "todo":
        return "To Do";
      case "inProgress":
        return "In Progress";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  const handleEdit = () => {
    onEdit(task);
    onClose();
  };

  const handleDelete = () => {
    onDelete(task);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="task-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="task-detail-header">
          <h2>태스크 상세</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="task-detail-content">
          <div className="task-detail-section">
            <label className="task-detail-label">제목</label>
            <h3 className="task-detail-title">{task.title}</h3>
          </div>

          <div className="task-detail-section">
            <label className="task-detail-label">설명</label>
            <p className="task-detail-description">{task.description || "설명이 없습니다."}</p>
          </div>

          {task.tags && task.tags.length > 0 && (
            <div className="task-detail-section">
              <label className="task-detail-label">태그</label>
              <div className="task-detail-tags">
                {task.tags.map((tag) => (
                  <span key={tag} className="task-detail-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="task-detail-meta">
            <div className="task-detail-meta-item">
              <label className="task-detail-label">우선순위</label>
              <span className={`priority-badge ${getPriorityColor(task.priority)}`}>{task.priority}</span>
            </div>

            <div className="task-detail-meta-item">
              <label className="task-detail-label">상태</label>
              <span className="status-badge">{getStatusLabel(task.status)}</span>
            </div>

            <div className="task-detail-meta-item">
              <label className="task-detail-label">생성일</label>
              <span className="task-detail-date">{formatDate(task.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="task-detail-actions">
          <button className="edit-button" onClick={handleEdit}>
            수정
          </button>
          <button className="delete-button" onClick={handleDelete}>
            삭제
          </button>
          <button className="cancel-button" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
