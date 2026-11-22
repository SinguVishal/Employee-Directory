import EmployeePhoto from "./EmployeePhoto.jsx";

function EmployeeList({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return <p>No employees match your search or filters.</p>;
  }

  return (
    <ul>
      {employees.map((employee) => (
        <li key={employee.id}>
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
          <button type="button" onClick={() => onEdit(employee)}>
            Edit
          </button>
          <button type="button" onClick={() => onDelete(employee.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default EmployeeList;
