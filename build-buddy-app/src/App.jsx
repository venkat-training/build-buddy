import { useState, useRef } from "react";
import "./App.css";

const isDev = import.meta.env.DEV;
const log = (...args) => isDev && console.log(...args);

const exampleQueries = [
  "I want to build a gaming PC with Ryzen 7 7800X3D",
  "What motherboard is compatible with AMD Ryzen 7 7800X3D?",
  "Compare Intel Core i5-14600K vs AMD Ryzen 7 7800X3D"
];

export default function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const lastRequestRef = useRef(0);

  const appId = import.meta.env.VITE_ALGOLIA_APP_ID;
  const agentId = import.meta.env.VITE_ALGOLIA_AGENT_ID;
  const searchKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY;
  const agentBaseUrl =
    import.meta.env.VITE_ALGOLIA_AGENT_BASE_URL ||
    `https://${appId}.algolia.net`;

  async function askAgent() {
    const now = Date.now();

    // Debounce: prevent rapid clicking
    if (now - lastRequestRef.current < 2000) {
      setResponse("Please wait a moment before asking again 🙂");
      return;
    }

    lastRequestRef.current = now;

    if (!appId || !agentId || !searchKey) {
      setResponse("Missing Algolia configuration.");
      return;
    }

    // Sanitize input
    const sanitizedQuery = query
      .trim()
      .replace(/<script>/gi, "")
      .substring(0, 1000);

    if (sanitizedQuery.length < 3) {
      setResponse("Please enter a longer question.");
      return;
    }

    setIsLoading(true);
    setResponse("Thinking...");

    try {
      const url = `${agentBaseUrl}/agent-studio/1/agents/${agentId}/completions?compatibilityMode=ai-sdk-5`;

      const requestBody = {
        messages: [
          {
            role: "user",
            parts: [{ text: sanitizedQuery }]
          }
        ]
      };

      log("Request URL:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-algolia-api-key": searchKey,
          "x-algolia-application-id": appId
        },
        body: JSON.stringify(requestBody)
      });

      if (response.status === 429) {
        setResponse(
          "You're sending requests too quickly 😅\n\nPlease wait a minute and try again."
        );
        return;
      }

      if (!response.ok) {
        setResponse("The AI service is temporarily unavailable. Please try again.");
        return;
      }

      const raw = await response.text();

      // Algolia Agent uses SSE (data: {...})
      const lines = raw
        .split("\n")
        .filter(l => l.startsWith("data: "))
        .map(l => l.replace("data: ", "").trim())
        .filter(l => l && l !== "[DONE]");

      let content = "";

      for (const line of lines) {
        try {
          const obj = JSON.parse(line);
          if (obj.type === "text-delta" && obj.delta) {
            content += obj.delta;
          }
        } catch {
          // silently skip
        }
      }

      setResponse(content || "No response returned.");

    } catch (error) {
      if (isDev) console.error(error);

      setResponse(
        "We're having trouble connecting right now.\n\nPlease try again in a moment."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>🔧 Build Buddy – AI PC Build Assistant</h1>

      <p className="subtitle">
        Tell me your PC goals and I’ll recommend compatible components.
      </p>

      {!response && !query && (
        <div className="examples">
          {exampleQueries.map((ex, i) => (
            <div
              key={i}
              className="example"
              onClick={() => setQuery(ex)}
            >
              💡 {ex}
            </div>
          ))}
        </div>
      )}

      <textarea
        className="query-input"
        placeholder="Example: I want to build a gaming PC with Ryzen 7 7800X3D"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={6}
      />

      <div className="actions">
        <button onClick={askAgent} disabled={!query.trim() || isLoading}>
          {isLoading ? "Thinking..." : "Ask Agent"}
        </button>

        <button
          type="button"
          className="secondary"
          onClick={() => {
            setQuery("");
            setResponse("");
          }}
        >
          Clear
        </button>
      </div>

      <pre className="response">
        {response || "Agent responses will appear here."}
      </pre>
    </div>
  );

}
