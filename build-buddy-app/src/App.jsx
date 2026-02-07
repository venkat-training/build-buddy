import { useState, useRef } from "react";
import "./App.css";

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

  // Config from Environment Variables
  const appId = import.meta.env.VITE_ALGOLIA_APP_ID;
  const agentId = import.meta.env.VITE_ALGOLIA_AGENT_ID;
  const searchKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY;
  const agentBaseUrl = import.meta.env.VITE_ALGOLIA_AGENT_BASE_URL || `https://${appId}.algolia.net`;

  async function askAgent() {
    if (Date.now() - lastRequestRef.current < 2000) return;
    if (!query.trim()) return;

    lastRequestRef.current = Date.now();
    setIsLoading(true);
    setResponse("");

    try {
      // Primary Attempt: Streaming
      await performQuery(true);
    } catch (streamError) {
      console.warn("Streaming interrupted or failed, trying fallback...", streamError);
      try {
        // Fallback: Standard JSON (More stable if Vercel cuts the stream)
        await performQuery(false);
      } catch (fallbackError) {
        setResponse("The AI is taking too long to respond. Please try a more specific question.");
        console.error("Final Error:", fallbackError);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function performQuery(isStreaming = true) {
    const url = `${agentBaseUrl}/agent-studio/1/agents/${agentId}/completions?compatibilityMode=ai-sdk-5`;

    // 30-second timeout to prevent indefinite hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const res = await fetch(url, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "x-algolia-api-key": searchKey,
        "x-algolia-application-id": appId,
        "Accept": isStreaming ? "text/event-stream" : "application/json",
        // BYPASS VERCEL BUFFERING
        "x-no-compression": "1",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({
        id: conversationIdRef.current,
        stream: isStreaming,
        messages: [{
          id: uuid(),
          role: "user",
          parts: [{ type: "text", text: query.trim() }]
        }]
      })
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`API Error: ${res.status}`);
    }

    if (!isStreaming) {
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || data.delta || "No content found.";
      setResponse(content);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const dataStr = line.replace("data:", "").trim();
        if (dataStr === "[DONE]") return;

        try {
          const json = JSON.parse(dataStr);
          const delta = json.delta || json.choices?.[0]?.delta?.content;
          if (delta) {
            fullText += delta;
            setResponse(fullText);
          }
        } catch (e) {
          // Fragmented JSON - wait for next chunk
        }
      }
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔧 Build Buddy</h1>
        <p>Your AI PC Architecture Guide</p>
      </header>

      <main className="chat-interface">
        <div className="input-section">
          <textarea
            className="main-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your build..."
            rows="4"
          />
          
          <div className="button-group">
            <button 
              className="ask-button" 
              onClick={askAgent} 
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? "Consulting AI..." : "Ask Agent"}
            </button>
            <button className="clear-button" onClick={() => {
              setQuery("");
              setResponse("");
              conversationIdRef.current = uuid();
            }}>
              Clear
            </button>
          </div>
        </div>

        {!response && !isLoading && (
          <div className="suggestions">
            {exampleQueries.map((q, i) => (
              <button key={i} onClick={() => setQuery(q)}>{q}</button>
            ))}
          </div>
        )}

        {(response || isLoading) && (
          <div className="response-area">
            {isLoading && !response ? (
              <div className="pulse-loader">Analyzing compatibility...</div>
            ) : (
              <pre className="text-display">{response}</pre>
            )}
          </div>
        )}
      </main>
    </div>
  );
}