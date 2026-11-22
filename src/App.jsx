import { useEffect, useState } from "react";
import EmployeeFilters from "./components/EmployeeFilters.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";
import EmployeeList from "./components/EmployeeList.jsx";

const emptyEmployee = {
  name: "",
  photo: "",
  role: "",
  department: "",
  email: "",
  phone: "",
};

const initialEmployees = [
  {
    id: "employee-1",
    name: "Vishal",
    photo:
      "https://plus.unsplash.com/premium_photo-1764519699614-162cff58eecd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    role: "Student",
    department: "Full Stack Development",
    email: "vishal@gmail.com",
    phone: "6987658690",
  },
  {
    id: "employee-2",
    name: "Dileep",
    photo:"https://plus.unsplash.com/premium_photo-1783318940411-4943eb27c3d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    role: "faculty",
    department: "Engineering",
    email: "dileep@gmail.com",
    phone: "9867335610",
  }
];

function App() {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");
    return savedEmployees ? JSON.parse(savedEmployees) : initialEmployees;
  });
  const [form, setForm] = useState(emptyEmployee);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const departments = [
  ...new Set(
    employees.map((employee) => employee.department).filter(Boolean),
  ),
];
  const roles = [
  ...new Set(
    employees.map((employee) => employee.role).filter(Boolean),
  ),
];
  const visibleEmployees = employees.filter((employee) => {
    const matchesName = employee.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesDepartment =
      !departmentFilter || employee.department === departmentFilter;
    const matchesRole = !roleFilter || employee.role === roleFilter;

    return matchesName && matchesDepartment && matchesRole;
  });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function resetForm() {
    setForm(emptyEmployee);
    setEditingId(null);
  }

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  function saveEmployee(event) {
    event.preventDefault();

    if (editingId === null) {
      setEmployees((currentEmployees) => [
        ...currentEmployees,
        { ...form, id: crypto.randomUUID() },
      ]);
    } else {
      setEmployees((currentEmployees) =>
        currentEmployees.map((employee) =>
          employee.id === editingId ? { ...employee, ...form } : employee,
        ),
      );
    }

    resetForm();
  }

  function editEmployee(employee) {
    const { id, ...employeeDetails } = employee;
    setForm(employeeDetails);
    setEditingId(id);
  }

  function deleteEmployee(id) {
    setEmployees((currentEmployees) =>
      currentEmployees.filter((employee) => employee.id !== id),
    );
    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">People management</p>
          <h1>Employee Directory</h1>
          <p className="page-description">
            Manage and browse your team in one place.
          </p>
        </div>
        <span className="employee-count">
          {employees.length} {employees.length === 1 ? "employee" : "employees"}
        </span>
      </header>

      <EmployeeForm
        form={form}
        editingId={editingId}
        onChange={updateField}
        onSubmit={saveEmployee}
        onCancel={resetForm}
      />

      <section className="employee-directory" aria-labelledby="employee-list-heading">
        <h2 id="employee-list-heading">Employees</h2>
        <EmployeeFilters
          search={search}
          departmentFilter={departmentFilter}
          roleFilter={roleFilter}
          departments={departments}
          roles={roles}
          onSearchChange={(event) => setSearch(event.target.value)}
          onDepartmentChange={(event) => setDepartmentFilter(event.target.value)}
          onRoleChange={(event) => setRoleFilter(event.target.value)}
        />
        <EmployeeList
          employees={visibleEmployees}
          onEdit={editEmployee}
          onDelete={deleteEmployee}
        />
      </section>
    </main>
  );
}

export default App;
