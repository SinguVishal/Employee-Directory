function EmployeeFilters({
  search,
  departmentFilter,
  roleFilter,
  departments,
  roles,
  onSearchChange,
  onDepartmentChange,
  onRoleChange,
}) {
  return (
    <>
      <label>
        Search by name
        <input type="search" value={search} onChange={onSearchChange} />
      </label>
      <label>
        Filter by department
        <select value={departmentFilter} onChange={onDepartmentChange}>
          <option value="">All departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </label>
      <label>
        Filter by role
        <select value={roleFilter} onChange={onRoleChange}>
          <option value="">All roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export default EmployeeFilters;
