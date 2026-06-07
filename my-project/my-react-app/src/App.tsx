import { useState } from "react";
import api from "./api";

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [id, setId] = useState<number | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState("");

  const handle = async (fn: () => Promise<any>) => {
    try {
      setError("");
      const res = await fn();
      setResponse(res.data);
    } catch (e: any) {
      setError(e.response?.data?.error || "Error");
    }
  };

  return (
    <div>
      <h1>Test App</h1>

      <input placeholder="name" onChange={e => setName(e.target.value)} />
      <input placeholder="surname" onChange={e => setSurname(e.target.value)} />

      <button onClick={() =>
        handle(() => api.post("/sign", { name }))
      }>
        Sign
      </button>

      <button onClick={() =>
        handle(() => api.post("/check", { name }))
      }>
        Check
      </button>

      <button onClick={() =>
        handle(() => api.post("/create", { name, surname }))
      }>
        Create
      </button>

      <button onClick={() =>
        handle(() => api.post("/pet", { id, pet: "dog" }))
      }>
        Add Pet
      </button>

      <button onClick={() =>
        handle(() => api.post("/colors", { id, colors: ["red", "blue"] }))
      }>
        Add Colors
      </button>

      <input
        placeholder="user id"
        onChange={e => setId(Number(e.target.value))}
      />

      <div style={{ color: "green" }}>
        {JSON.stringify(response)}
      </div>

      <div style={{ color: "red" }}>
        {error}
      </div>
    </div>
  );
}

export default App;