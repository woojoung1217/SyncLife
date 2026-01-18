import "./TaskCard.css";

const TaskCard = ({ task }) => {
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

  return (
    <div className={`task-card ${getPriorityColor(task.priority)}`}>
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`priority-badge ${getPriorityColor(task.priority)}`}>{task.priority}</span>
      </div>
      {task.description && <p className="task-description">{task.description}</p>}
      <div className="task-card-footer">
        <span className="task-date">{formatDate(task.createdAt)}</span>
      </div>
    </div>
  );
};

export default TaskCard;
