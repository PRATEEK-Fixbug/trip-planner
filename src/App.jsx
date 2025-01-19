import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";
import ExpenseDetails from "./ExpenseDetails";

function App() {
  const [people, setPeople] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Retrieve saved data from localStorage when the app loads
    const savedData = localStorage.getItem("tripData");
    if (savedData) {
      const { people, totalExpense } = JSON.parse(savedData);
      setPeople(people);
      setTotalExpense(totalExpense);
    }
  }, []);

  const saveDataToLocalStorage = (people, totalExpense) => {
    // Save the data to localStorage
    localStorage.setItem("tripData", JSON.stringify({ people, totalExpense }));
  };

  const addPerson = (name) => {
    if (name && !people.some((person) => person.name === name)) {
      const newPeople = [...people, { name, paid: 0 }];
      setPeople(newPeople);
      saveDataToLocalStorage(newPeople, totalExpense);
    }
  };

  const addExpense = (paidBy, amount) => {
    const newPeople = people.map(person =>
      person.name === paidBy ? { ...person, paid: person.paid + amount } : person
    );
    const newTotalExpense = totalExpense + amount;
    setPeople(newPeople);
    setTotalExpense(newTotalExpense);
    saveDataToLocalStorage(newPeople, newTotalExpense);
  };

  const updatePaidAmount = (name, newAmount) => {
    const newPeople = people.map(person =>
      person.name === name ? { ...person, paid: newAmount } : person
    );
    setPeople(newPeople);
    saveDataToLocalStorage(newPeople, totalExpense);
  };

  const clearData = () => {
    // Clear data from localStorage and reset state
    localStorage.removeItem("tripData");
    setPeople([]);
    setTotalExpense(0);
  };

  return (
    <Container>
      <h1 className="my-4">Trip Expense Splitter</h1>
      <ExpenseForm addPerson={addPerson} addExpense={addExpense} people={people} />
      <ExpenseDetails people={people} totalExpense={totalExpense} updatePaidAmount={updatePaidAmount} />
      
      {/* Clear Data Button */}
      <Button variant="danger" onClick={clearData} className="mt-4">
        Clear Data
      </Button>
    </Container>
  );
}

export default App;
