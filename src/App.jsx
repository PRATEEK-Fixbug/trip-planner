import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";
import ExpenseDetails from "./ExpenseDetails";

function App() {
  const [people, setPeople] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const addPerson = (name) => {
    if (name && !people.some((person) => person.name === name)) {
      setPeople([...people, { name, paid: 0 }]);
    }
  };

  const addExpense = (paidBy, amount) => {
    setPeople(people.map(person => person.name === paidBy ? { ...person, paid: person.paid + amount } : person));
    setTotalExpense(totalExpense + amount);
  };

  const updatePaidAmount = (name, newAmount) => {
    setPeople(people.map(person => person.name === name ? { ...person, paid: newAmount } : person));
  };

  return (
    <Container>
      <h1 className="my-4">Trip Expense Splitter</h1>
      <ExpenseForm addPerson={addPerson} addExpense={addExpense} people={people} />
      <ExpenseDetails people={people} totalExpense={totalExpense} updatePaidAmount={updatePaidAmount} />
    </Container>
  );
}

export default App;
