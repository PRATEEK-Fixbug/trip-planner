import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const ExpenseDetails = ({ people, totalExpense, updatePaidAmount }) => {
  const perPersonShare = totalExpense / people.length;

  return (
    <div>
      <h3>Expense Summary</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Paid</th>
            <th>Owed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>
                <input
                  type="number"
                  value={person.paid}
                  onChange={(e) => updatePaidAmount(person.name, parseFloat(e.target.value))}
                  className="form-control"
                />
              </td>
              <td>{(perPersonShare - person.paid).toFixed(2)}</td>
              <td>
                <Button variant="warning" onClick={() => updatePaidAmount(person.name, person.paid)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="mt-3">
        <h5>Total Expenses: {totalExpense.toFixed(2)}</h5>
        <h5>Amount per Person: {perPersonShare.toFixed(2)}</h5>
      </div>
    </div>
  );
};

export default ExpenseDetails;
