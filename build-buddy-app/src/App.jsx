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
      const res = await fetch(
        `${agentBaseUrl}/agent-studio/1/agents/${agentId}/completions?compatibilityMode=ai-sdk-5`,
        {  // CHANGED: Added agent-studio and changed query to completions
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
          ]
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        setResponse(
          `Request failed (${res.status}): ${errorText || res.statusText}`
        );
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedResponse = "";
      let buffer = "";

      setResponse(""); // Clear previous response

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        buffer += decoder.decode(value, { stream: !done });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || !trimmedLine.startsWith("data: ")) continue;

          const jsonStr = trimmedLine.substring(6);
          if (jsonStr === "[DONE]") break;

          try {
            const data = JSON.parse(jsonStr);
            // Handle various possible JSON structures from Algolia/AI SDK
            const content =
              data.textDelta ||
              data.text ||
              data.choices?.[0]?.delta?.content ||
              "";

            if (content) {
              accumulatedResponse += content;
              setResponse(accumulatedResponse);
            }
          } catch (e) {
            // Ignore parse errors for partial JSON if any
          }
        }
      }
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
