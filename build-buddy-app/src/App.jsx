import { useState, useRef } from "react";
import "./App.css";

const isDev = import.meta.env.DEV;
const log = (...args) => isDev && console.log(...args);

const exampleQueries = [
  "I want to build a gaming PC with Ryzen 7 7800X3D",
  "What motherboard is compatible with AMD Ryzen 7 7800X3D?",
  "Compare Intel Core i5-14600K vs AMD Ryzen 7 7800X3D"
];

const uuid = () => crypto.randomUUID();

export default function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const lastRequestRef = useRef(0);
  const conversationIdRef = useRef(uuid());

  const appId = import.meta.env.VITE_ALGOLIA_APP_ID;
  const agentId = import.meta.env.VITE_ALGOLIA_AGENT_ID;
  const searchKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY;

  // Fix: Ensure the URL uses the correct subdomain structure
  const agentBaseUrl =
    import.meta.env.VITE_ALGOLIA_AGENT_BASE_URL ||
    `https://${appId}.algolia.net`;

  async function askAgent() {
    const now = Date.now();

    if (now - lastRequestRef.current < 2000) {
      setResponse("Please wait a moment before asking again 🙂");
      return;
    }

    lastRequestRef.current = now;

    if (!appId || !agentId || !searchKey) {
      setResponse("Missing Algolia configuration. check your .env file.");
      return;
    }

    const sanitizedQuery = query.trim().substring(0, 1000);

    if (sanitizedQuery.length < 3) {
      setResponse("Please enter a longer question.");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const url = `${agentBaseUrl}/agent-studio/1/agents/${agentId}/completions?compatibilityMode=ai-sdk-5`;

      const requestBody = {
        id: conversationIdRef.current,
        messages: [
          {
            id: uuid(),
            role: "user",
            parts: [{ type: "text", text: sanitizedQuery }]
          }
        ]
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-algolia-api-key": searchKey,
          "x-algolia-application-id": appId,
          "Accept": "text/event-stream"
        },
        body: JSON.stringify(requestBody)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${res.status}`);
      }

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";
      let streamBuffer = ""; // Crucial: holds partial chunks

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        // Append new chunk to buffer
        streamBuffer += decoder.decode(value, { stream: true });

        // Split buffer into lines (SSE format)
        const lines = streamBuffer.split("\n");
        
        // Keep the last (potentially incomplete) line in the buffer
        streamBuffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || !trimmedLine.startsWith("data:")) continue;

          const data = trimmedLine.replace("data:", "").trim();
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            // Algolia compatibilityMode ai-sdk-5 uses .delta for the text chunk
            const chunk = parsed.delta || ""; 
            
            if (chunk) {
              fullContent += chunk;
              setResponse(fullContent);
            }
          } catch (e) {
            log("Error parsing JSON chunk", e);
          }
        }
      }

      if (!fullContent) {
        setResponse("Agent connected but returned no text.");
      }

    } catch (err) {
      console.error("Agent Error:", err);
      setResponse(`Error: ${err.message || "Connection failed"}. Check console for details.`);
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
            <div key={i} className="example" onClick={() => setQuery(ex)}>
              💡 {ex}
            </div>
          ))}
        </div>
      )}

      <textarea
        className="query-input"
        placeholder="e.g. Help me build a $1500 workstation..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="actions">
        <button onClick={askAgent} disabled={!query.trim() || isLoading}>
          {isLoading ? "Thinking..." : "Ask Agent"}
        </button>

        <button
          className="secondary"
          onClick={() => {
            setQuery("");
            setResponse("");
            conversationIdRef.current = uuid();
          }}
        >
          Clear
        </button>
      </div>

      <div className="response-container">
        <pre className="response">
          {response || (isLoading ? "..." : "Agent responses will appear here.")}
        </pre>
      </div>
    </div>
  );
}