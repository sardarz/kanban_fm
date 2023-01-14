const DeleteModal = ({ type }: { type: string }) => {
  const boardDescription =
    "Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.";
  const taskDescription =
    "Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.";

  return (
    <div className="delete">
      <h3 className="title">
        Delete this {type === "board" ? "board" : "task"}?
      </h3>
      <p className="description">
        {type === "board" ? boardDescription : taskDescription}
      </p>
      <div className="deleteBtnsWrapper">
        <button type="button" className="primary">
          Delete
        </button>
        <button type="button" className="secondary">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
