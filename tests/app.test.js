const request = require('supertest');
const http = require('http');
const { app } = require('..');
const { getEmployees } = require('../controllers');

jest.mock('../controllers', () => {
  const originalModule = jest.requireActual('../controllers');

  return {
    ...originalModule,
    getEmployees: jest.fn(),
  };
});

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done); // Use a different port for testing
});

afterAll((done) => {
  server.close(done);
});

describe('Controller function test', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clears mocks before each test
  });

  it('should return all employees', () => {
    let mockEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    ];
    getEmployees.mockReturnValue(mockEmployees);
    let result = getEmployees();

    expect(result).toEqual(mockEmployees);
    expect(result.length).toBe(3);
  });
});

describe('api endpoint tests', () => {
  it('should retrieve all employees', async () => {
    const res = await request(app).get('/employees');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: 'Priya Singh',
          email: 'priya.singh@example.com',
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: 'Ankit Verma',
          email: 'ankit.verma@example.com',
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
    expect(res.body.employees.length).toBe(3);
  });
  it('should retrieve an employee by ID', async () => {
    const res = await request(app).get('/employees/details/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('employee');
    expect(res.body.employee.employeeId).toBe(1);
    expect(res.body.employee.name).toBe('Rahul Sharma');
  });
});
