import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import { modalTypes } from "../../common/utils/modalTypes";
import { ITask } from "../../features/tasks/tasksSlice";
import BoardModal from "./BoardModal/BoardModal";
import EditBoard from "./BoardModal/EditBoard";
import DeleteModal from "./DeleteModal/DeleteModal";
import styles from "./styles.module.css";
import EditTask from "./TaskModal/EditTask";
import TaskModal from "./TaskModal/TaskModal";
import ViewTaskModal from "./ViewTaskModal/ViewTaskModal";

interface ModalProps {
  type: string;
  closeModal: () => void;
  taskId?: string;
  columnId?: string;
  task?: ITask;
}

interface ModalWrapperProps {
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
}: ModalWrapperProps) => {
  return (
    <div
      onClick={(e) => {
        if (type === modalTypes.editBoard || type === modalTypes.viewTask)
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
          <EditBoard isNewBoard={false} closeModal={closeModal} />
        ) : type === modalTypes.addTask ? (
          <TaskModal isNewTask={true} closeModal={closeModal} />
        ) : type === modalTypes.editTask ? (
          <EditTask task={task as ITask} closeModal={closeModal} />
        ) : type === modalTypes.viewTask ? (
          <ViewTaskModal
            columnId={columnId ? columnId : null}
            taskId={taskId ? taskId : ""}
            closeModal={closeModal}
          />
        ) : type === modalTypes.deleteBoard ? (
          <DeleteModal type="board" />
        ) : type === modalTypes.deleteTask ? (
          <DeleteModal type="task" />
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
