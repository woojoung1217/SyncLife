import "./DeleteConfirmModal.css";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-confirm-header">
          <h2>태스크 삭제</h2>
        </div>

        <div className="delete-confirm-content">
          <p>정말로 이 태스크를 삭제하시겠습니까?</p>
          {taskTitle && (
            <div className="delete-confirm-task-title">
              <strong>"{taskTitle}"</strong>
            </div>
          )}
          <p className="delete-warning">이 작업은 되돌릴 수 없습니다.</p>
        </div>

        <div className="delete-confirm-actions">
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
          <button className="confirm-delete-button" onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
