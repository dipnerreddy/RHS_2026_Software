import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Checking backend...");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8090/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend responded with an error");
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>React + Node.js Connection Test</h1>

      {error ? (
        <p style={{ color: "red" }}>
          ❌ Backend connection failed: {error}
        </p>
      ) : (
        <p style={{ color: "green" }}>
          ✅ Backend says: {message}
        </p>
      )}
    </div>
  );
}

export default App;