function TableForm({
  cancelHandler,
  changeHandler,
  submitHandler,
  newTableData,
}) {
  return (
    <div>
      <div>
        <h2> New Table</h2>
      </div>
      <form>
        <div>
          <label>Table Name</label>
          <input
            id="table_name"
            type="text"
            name="table_name"
            className="form-control"
            onChange={changeHandler}
            value={newTableData.table_name}
            style={{ width: "50%" }}
            required
          />
        </div>
        <div>
          <label>Capacity</label>
          <input
            id="capacity"
            type="number"
            name="capacity"
            className="form-control"
            onChange={changeHandler}
            value={newTableData.capacity}
            style={{ width: "50%" }}
            required
          />
        </div>
      </form>
      <button
        onClick={submitHandler}
        type="submit"
        className="btn btn-secondary"
      >
        Submit
      </button>
      <button
        onClick={cancelHandler}
        type="button"
        className="btn btn-secondary"
      >
        Cancel
      </button>
    </div>
  );
}

export default TableForm;
