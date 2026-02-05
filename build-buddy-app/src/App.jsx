import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const agentBaseUrl =
    import.meta.env.VITE_ALGOLIA_AGENT_BASE_URL ||
    `https://${import.meta.env.VITE_ALGOLIA_APP_ID}.algolia.com`;

  async function askAgent() {
    const res = await fetch(
      `${agentBaseUrl}/1/agents/${import.meta.env.VITE_ALGOLIA_AGENT_ID}/query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Algolia-API-Key": import.meta.env.VITE_ALGOLIA_SEARCH_KEY,
          "X-Algolia-Application-Id": import.meta.env.VITE_ALGOLIA_APP_ID
        },
        body: JSON.stringify({
          query
        })
      }
    );

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Build Buddy</h1>

      <input
        style={{ width: "400px", padding: "8px" }}
        placeholder="Describe your PC build..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <br /><br />

      <button onClick={askAgent}>Ask Agent</button>

      <pre>{response}</pre>
    </div>
  );
}
