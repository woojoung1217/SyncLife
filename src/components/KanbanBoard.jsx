import { useTaskStore } from "../store/useTaskStore";
import TaskCard from "./TaskCard";
import "./KanbanBoard.css";

const KanbanBoard = () => {
  const { tasks, updateTaskStatus } = useTaskStore();

  const columns = [
    { id: "todo", title: "To Do", status: "todo" },
    { id: "inProgress", title: "In Progress", status: "inProgress" },
    { id: "done", title: "Done", status: "done" },
  ];

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      updateTaskStatus(taskId, newStatus);
    }
  };

  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <div key={column.id} className="kanban-column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column.status)}>
          <div className="column-header">
            <h2 className="column-title">{column.title}</h2>
            <span className="task-count">{getTasksByStatus(column.status).length}</span>
          </div>
          <div className="column-content">
            {getTasksByStatus(column.status).map((task) => (
              <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
                <TaskCard task={task} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
