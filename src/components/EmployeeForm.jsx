import EmployeePhoto from "./EmployeePhoto.jsx";

function EmployeeForm({ form, editingId, onChange, onSubmit, onCancel }) {
  return (
    <section className="employee-form-card" aria-labelledby="employee-form-heading">
      <h2 id="employee-form-heading">
        {editingId === null ? "Add an employee" : "Edit employee"}
      </h2>
      <form onSubmit={onSubmit}>
        <ul className="employee-form-grid">
          <li className="employee-field">
            <label>
              Name
              <input name="name" value={form.name} onChange={onChange} required />
            </label>
          </li>
          <li className="employee-field">
            <label>
              Photo URL
              <input name="photo" type="url" value={form.photo} onChange={onChange} />
            </label>
          </li>
          {form.photo && (
            <li className="employee-photo-preview">
              <p>Photo preview</p>
              <EmployeePhoto
                key={form.photo}
                src={form.photo}
                alt="Employee photo preview"
              />
            </li>
          )}
          <li className="employee-field">
            <label>
              Role
              <input name="role" value={form.role} onChange={onChange} />
            </label>
          </li>
          <li className="employee-field">
            <label>
              Department
              <input name="department" value={form.department} onChange={onChange} />
            </label>
          </li>
          <li className="employee-field">
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={onChange} />
            </label>
          </li>
          <li className="employee-field">
            <label>
              Phone
              <input name="phone" type="tel" value={form.phone} onChange={onChange} />
            </label>
          </li>
          <li className="employee-form-actions">
            <button className="button-primary" type="submit">
              {editingId === null ? "Add employee" : "Save changes"}
            </button>
            {editingId !== null && (
              <button className="button-secondary" type="button" onClick={onCancel}>
                Cancel
              </button>
            )}
          </li>
        </ul>
      </form>
    </section>
  );
}

export default EmployeeForm;
