import { useMemo } from "react";
import { createPortal } from "react-dom";
import { modalTypes } from "../../common/utils/modalTypes";
import { ITask } from "../../features/tasks/tasksSlice";
import BoardModal from "./BoardModal/BoardModal";
import DeleteModal from "./DeleteModal/DeleteModal";
import styles from "./styles.module.css";
import TaskModal from "./TaskModal/TaskModal";
import ViewTaskModal from "./ViewTaskModal/ViewTaskModal";

interface ModalProps {
  type: string;
  closeModal: () => void;
  taskId?: string;
  columnId?: string;
  task?: ITask;
}

const ModalWrapper = ({
  type,
  closeModal,
  taskId,
  columnId,
  task,
}: ModalProps) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
      className={`${styles.modalWrapper}`}
    >
      <div
        className={`${styles.modalContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        {type === modalTypes.addBoard ? (
          <BoardModal isNewBoard={true} closeModal={closeModal} />
        ) : type === modalTypes.editBoard ? (
          <BoardModal isNewBoard={false} closeModal={closeModal} />
        ) : type === modalTypes.addTask ? (
          <TaskModal task={null} closeModal={closeModal} />
        ) : type === modalTypes.editTask ? (
          <TaskModal task={task as ITask} closeModal={closeModal} />
        ) : type === modalTypes.viewTask ? (
          <ViewTaskModal taskId={taskId ? taskId : ""} />
        ) : type === modalTypes.deleteBoard ? (
          <DeleteModal type="board" closeModal={closeModal} />
        ) : type === modalTypes.deleteTask ? (
          <DeleteModal
            task={task as ITask}
            type="task"
            closeModal={closeModal}
          />
        ) : null}
      </div>
    </div>
  );
};

const Modal = ({ type, closeModal, taskId, columnId, task }: ModalProps) => {
  const containerElement = useMemo(
    () => document.getElementById("modal-container") as HTMLElement,
    []
  );

  return createPortal(
    <ModalWrapper
      columnId={columnId}
      taskId={taskId}
      closeModal={closeModal}
      type={type}
      task={task}
    />,
    containerElement
  );
};

export default Modal;
