import { useState } from "react";
import type { AxiosError, AxiosResponse } from "axios";
import api from "./api";
import type { User, IdResponse, ErrorResponse } from "./types";

type ApiResponse = User | IdResponse;

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [id, setId] = useState<number | null>(null);

  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState("");

  const handle = async (
    fn: () => Promise<AxiosResponse<ApiResponse>>
  ) => {
    try {
      setError("");

      const res = await fn();

      setResponse(res.data);
    } catch (e: unknown) {
      const error = e as AxiosError<ErrorResponse>;

      setError(
        error.response?.data?.error ?? "Unknown error"
      );
    }
  };

  return (
    <div>
      <h1>Test App</h1>

      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />

      <button
        onClick={() =>
          handle(() =>
            api.post<IdResponse>("/sign", { name })
          )
        }
      >
        Sign
      </button>

      <button
        onClick={() =>
          handle(() =>
            api.post<IdResponse>("/check", { name })
          )
        }
      >
        Check
      </button>

      <button
        onClick={() =>
          handle(() =>
            api.post<User>("/create", {
              name,
              surname
            })
          )
        }
      >
        Create
      </button>

      <button
        onClick={() =>
          handle(() =>
            api.post<User>("/pet", {
              id,
              pet: "dog"
            })
          )
        }
      >
        Add Pet
      </button>

      <button
        onClick={() =>
          handle(() =>
            api.post<User>("/colors", {
              id,
              colors: ["red", "blue"]
            })
          )
        }
      >
        Add Colors
      </button>

      <input
        placeholder="user id"
        onChange={(e) =>
          setId(Number(e.target.value))
        }
      />

      <div style={{ color: "green" }}>
        {response && (
          <pre>
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>

      <div style={{ color: "red" }}>
        {error}
      </div>
    </div>
  );
}

export default App;