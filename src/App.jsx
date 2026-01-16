import { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import TaskModal from "./components/TaskModal";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">SyncLife 칸반 보드</h1>
        <button className="add-task-button" onClick={() => setIsModalOpen(true)}>
          + 새 태스크 추가
        </button>
      </header>

      <main className="app-main">
        <KanbanBoard />
      </main>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
