import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const appId = import.meta.env.VITE_ALGOLIA_APP_ID;
  const agentId = import.meta.env.VITE_ALGOLIA_AGENT_ID;
  const searchKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY;
  const agentBaseUrl =
    import.meta.env.VITE_ALGOLIA_AGENT_BASE_URL ||
    `https://${appId}.algolia.net`;  // CHANGED: Removed -dsn

  async function askAgent() {
    if (!appId || !agentId || !searchKey) {
      setResponse(
        "Missing Algolia configuration. Please set VITE_ALGOLIA_APP_ID, " +
          "VITE_ALGOLIA_AGENT_ID, and VITE_ALGOLIA_SEARCH_KEY."
      );
      return;
    }

    try {
      const res = await fetch(`${agentBaseUrl}/agent-studio/1/agents/${agentId}/completions`, {  // CHANGED: Added agent-studio and changed query to completions
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-algolia-api-key": searchKey,              // CHANGED: Lowercase x
          "x-algolia-application-id": appId            // CHANGED: Lowercase x
        },
        body: JSON.stringify({
          messages: [                                  // CHANGED: New message format
            {
              role: "user",
              parts: [
                {
                  text: query
                }
              ]
            }
          ],
          compatibilityMode: "legacy"
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        setResponse(
          `Request failed (${res.status}): ${errorText || res.statusText}`
        );
        return;
      }

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(
        `Network error: ${error.message}. Verify the agent base URL and DNS.`
      );
    }
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