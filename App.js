import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const result = await fetch('https://bfhl-api-psi.vercel.app/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
      const data = await result.json();
      setResponse(data);
    } catch (error) {
      alert('Invalid JSON input');
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((option) => option !== value)
        : [...selectedOptions, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
          </div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>
            <h3>Numbers:</h3>
            <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            <h3>Highest lowercase alphabet:</h3>
            <pre>{JSON.stringify(response.highest_lowercase_alphabet, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Roll Number</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Enter JSON here...'
            rows="4"
            cols="50"
          />
          <button type="submit">Submit</button>
        </form>
        <div>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest lowercase alphabet"
              onChange={handleOptionChange}
            />
            Highest lowercase alphabet
          </label>
        </div>
        {renderResponse()}
      </header>
    </div>
  );
}

export default App;