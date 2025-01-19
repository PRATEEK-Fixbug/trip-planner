import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const ExpenseForm = ({ addPerson, addExpense, people }) => {
  const [personName, setPersonName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");

  const handleAddPerson = () => {
    addPerson(personName);
    setPersonName("");
  };

  const handleAddExpense = () => {
    if (expenseAmount && paidBy) {
      addExpense(paidBy, parseFloat(expenseAmount));
      setExpenseAmount("");
      setPaidBy("");
    }
  };

  return (
    <div>
      <Row className="mb-3">
        <Col xs={8}>
          <Form.Control
            type="text"
            placeholder="Enter person's name"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
          />
        </Col>
        <Col xs={4}>
          <Button variant="primary" onClick={handleAddPerson}>Add Person</Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={6}>
          <Form.Control
            type="number"
            placeholder="Expense Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
        </Col>
        <Col xs={6}>
          <Form.Control
            as="select"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
          >
            <option value="">Select Person</option>
            {people.map((person, index) => (
              <option key={index} value={person.name}>{person.name}</option>
            ))}
          </Form.Control>
        </Col>
      </Row>
      <Button variant="primary" onClick={handleAddExpense}>Add Expense</Button>
    </div>
  );
};

export default ExpenseForm;
