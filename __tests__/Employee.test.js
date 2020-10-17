const Employee = require('../lib/Employee.js');

test('creates a new employee', () => {
    const employee = new Employee('Joe');

    expect(employee.first_name).toBe('Joe');
    expect(employee.last_name).toBe('Sneed');
    expect(employee.title).toBe('Analyst');
    expect(employee.role_id).toBe(1);
    expect(employee.manager_id).toBe(1);
});