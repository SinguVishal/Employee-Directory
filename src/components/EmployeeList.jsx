import EmployeePhoto from "./EmployeePhoto.jsx";

function EmployeeList({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return (
      <p className="empty-state">No employees match your search or filters.</p>
    );
  }

  return (
    <ul className="employee-list">
      {employees.map((employee) => (
        <li className="employee-card" key={employee.id}>
          {employee.photo && (
            <EmployeePhoto
              key={employee.photo}
              src={employee.photo}
              alt={employee.name}
            />
          )}
          <h3>{employee.name}</h3>
          <p>Role: {employee.role}</p>
          <p>Department: {employee.department}</p>
          <p>Email: {employee.email}</p>
          <p>Phone: {employee.phone}</p>
          <div className="employee-card-actions">
            <button
              className="button-secondary"
              type="button"
              onClick={() => onEdit(employee)}
            >
              Edit
            </button>
            <button
              className="button-danger"
              type="button"
              onClick={() => onDelete(employee.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default EmployeeList;
