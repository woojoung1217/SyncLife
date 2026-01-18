import { useState, useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import "./TaskModal.css";

const TaskModal = ({ isOpen, onClose, task = null }) => {
  const { addTask, updateTask } = useTaskStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});

  const isEditMode = !!task;

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Medium",
        tags: task.tags || [],
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        tags: [],
      });
    }
    setTagInput("");
    setErrors({});
  }, [task, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "제목은 필수 입력 항목입니다.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isEditMode) {
      // 태스크 수정
      updateTask(task.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        tags: formData.tags,
      });
    } else {
      // 태스크 추가
      addTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        tags: formData.tags,
      });
    }

    // 폼 초기화
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      tags: [],
    });
    setTagInput("");
    setErrors({});
    onClose();
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 에러 초기화
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? "태스크 수정" : "새 태스크 추가"}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">
              제목 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="태스크 제목을 입력하세요"
              className={errors.title ? "error" : ""}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="priority">
              우선순위 <span className="required">*</span>
            </label>
            <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">설명</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="태스크에 대한 설명을 입력하세요 (선택사항)"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">태그</label>
            <div className="tags-input-container">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleAddTag}
                placeholder="태그를 입력하고 Enter를 누르세요"
                className="tags-input"
              />
              {formData.tags.length > 0 && (
                <div className="tags-list">
                  {formData.tags.map((tag) => (
                    <span key={tag} className="tag-item">
                      {tag}
                      <button
                        type="button"
                        className="tag-remove"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="submit-button">
              {isEditMode ? "수정" : "추가"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
