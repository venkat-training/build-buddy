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
  const agentBaseUrl = import.meta.env.VITE_ALGOLIA_AGENT_BASE_URL || `https://${appId}.algolia.net`;

  async function askAgent() {
    const now = Date.now();
    if (now - lastRequestRef.current < 2000) {
      setResponse("Please wait a moment before asking again 🙂");
      return;
    }
    lastRequestRef.current = now;

    if (!appId || !agentId || !searchKey) {
      setResponse("Missing Algolia configuration.");
      return;
    }

    const sanitizedQuery = query.trim().replace(/<script>/gi, "").substring(0, 1000);
    if (sanitizedQuery.length < 3) {
      setResponse("Please enter a longer question.");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      // Primary: Streaming
      await runQuery(sanitizedQuery, true);
    } catch (err) {
      log("Streaming interrupted, attempting non-streaming fallback...", err);
      try {
        // Secondary: Non-streaming (Forces a fresh connection with a cache-buster)
        await runQuery(sanitizedQuery, false);
      } catch (fallbackErr) {
        log("Fallback failed", fallbackErr);
        setResponse("The AI took too long to respond. Please try a simpler or more specific question.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function runQuery(sanitizedQuery, isStreaming) {
    // Cache buster for the fallback to prevent 'Failed to Fetch' lock
    const url = `${agentBaseUrl}/agent-studio/1/agents/${agentId}/completions?compatibilityMode=ai-sdk-5${!isStreaming ? '&t=' + Date.now() : ''}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-algolia-api-key": searchKey,
        "x-algolia-application-id": appId,
        "Accept": isStreaming ? "text/event-stream" : "application/json",
        "x-no-compression": "1" // Bypass Vercel's Edge buffering
      },
      body: JSON.stringify({
        id: conversationIdRef.current,
        stream: isStreaming, // Explicitly set stream mode
        messages: [{
          id: uuid(),
          role: "user",
          parts: [{ type: "text", text: sanitizedQuery }]
        }]
      })
    });

    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorMsg}`);
    }

    // NON-STREAMING HANDLING
    if (!isStreaming) {
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || data.delta || data.message || "";
      if (!content) throw new Error("Empty response from fallback");
      setResponse(content);
      return;
    }

    // STREAMING HANDLING
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let content = "";
    let buffer = ""; 

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; 

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data:")) continue;
        
        const payload = trimmed.replace("data:", "").trim();
        if (payload === "[DONE]") return;

        try {
          const obj = JSON.parse(payload);
          const delta = obj.delta || obj.choices?.[0]?.delta?.content;
          if (delta) {
            content += delta;
            setResponse(content);
          }
        } catch (e) {
          // Fragmented JSON - wait for next chunk
        }
      }
    }
  }

  // --- UI REMAINS UNCHANGED ---
  return (
    <div className="app">
      <h1>🔧 Build Buddy – AI PC Build Assistant</h1>
      <p className="subtitle">Tell me your PC goals and I’ll recommend compatible components.</p>

      {!response && !query && (
        <div className="examples">
          {exampleQueries.map((ex, i) => (
            <div key={i} className="example" onClick={() => setQuery(ex)}>💡 {ex}</div>
          ))}
        </div>
      )}

      <textarea className="query-input" value={query} onChange={(e) => setQuery(e.target.value)} />

      <div className="actions">
        <button onClick={askAgent} disabled={!query.trim() || isLoading}>
          {isLoading ? "Thinking..." : "Ask Agent"}
        </button>
        <button className="secondary" onClick={() => {
          setQuery(""); setResponse(""); conversationIdRef.current = uuid();
        }}>Clear</button>
      </div>

      <pre className="response">{response || "Agent responses will appear here."}</pre>
    </div>
  );
}