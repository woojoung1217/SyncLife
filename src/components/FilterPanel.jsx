import { useTaskStore } from "../store/useTaskStore";
import "./FilterPanel.css";

const FilterPanel = ({ filters, onFilterChange, onResetFilters }) => {
  const { tasks } = useTaskStore();

  // 모든 태그 추출
  const allTags = Array.from(
    new Set(tasks.flatMap((task) => task.tags || []))
  ).sort();

  const handlePriorityChange = (priority) => {
    const newPriorities = filters.priorities.includes(priority)
      ? filters.priorities.filter((p) => p !== priority)
      : [...filters.priorities, priority];
    onFilterChange({ ...filters, priorities: newPriorities });
  };

  const handleStatusChange = (status) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    onFilterChange({ ...filters, statuses: newStatuses });
  };

  const handleTagChange = (tag) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ ...filters, tags: newTags });
  };

  const hasActiveFilters =
    filters.priorities.length > 0 ||
    filters.statuses.length > 0 ||
    filters.tags.length > 0;

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3 className="filter-title">필터</h3>
        {hasActiveFilters && (
          <button className="reset-filters-button" onClick={onResetFilters}>
            필터 초기화
          </button>
        )}
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">우선순위</h4>
        <div className="filter-options">
          {["High", "Medium", "Low"].map((priority) => (
            <label key={priority} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.priorities.includes(priority)}
                onChange={() => handlePriorityChange(priority)}
              />
              <span className={`priority-label priority-${priority.toLowerCase()}`}>
                {priority}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-section-title">상태</h4>
        <div className="filter-options">
          {[
            { value: "todo", label: "To Do" },
            { value: "inProgress", label: "In Progress" },
            { value: "done", label: "Done" },
          ].map((status) => (
            <label key={status.value} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.statuses.includes(status.value)}
                onChange={() => handleStatusChange(status.value)}
              />
              <span>{status.label}</span>
            </label>
          ))}
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="filter-section">
          <h4 className="filter-section-title">태그</h4>
          <div className="filter-options filter-tags">
            {allTags.map((tag) => (
              <label key={tag} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                <span className="tag-label">{tag}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
