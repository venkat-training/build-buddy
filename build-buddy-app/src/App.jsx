import { useState } from "react";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const appId = import.meta.env.VITE_ALGOLIA_APP_ID;
  const agentId = import.meta.env.VITE_ALGOLIA_AGENT_ID;
  const searchKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY;
  const agentBaseUrl = import.meta.env.VITE_ALGOLIA_AGENT_BASE_URL || `https://${appId}.algolia.net`;

  async function askAgent() {
    if (!appId || !agentId || !searchKey) {
      setResponse(
        "Missing Algolia configuration. Please set VITE_ALGOLIA_APP_ID, " +
        "VITE_ALGOLIA_AGENT_ID, and VITE_ALGOLIA_SEARCH_KEY."
      );
      return;
    }

    setIsLoading(true);
    setResponse("Thinking...");

    try {
      // Build the URL WITHOUT query parameters
      const url = `${agentBaseUrl}/agent-studio/1/agents/${agentId}/completions?stream=true&compatibilityMode=ai-sdk-4`;
      
      // Build request body
      const requestBody = {
        messages: [
          {
            role: "user",
            parts: [
              {
                text: query,
              },
            ],
          },
        ],
      };

      console.log("🔍 Request URL:", url);
      console.log("📤 Request body:", JSON.stringify(requestBody, null, 2));

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-algolia-api-key": searchKey,
          "x-algolia-application-id": appId,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("📥 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error response:", errorText);
        
        let errorMessage = `Request failed (${response.status}): ${errorText}`;
        
        if (response.status === 404) {
          errorMessage += "\n\nTroubleshooting:\n";
          errorMessage += `1. Verify Agent ID: ${agentId}\n`;
          errorMessage += `2. Ensure agent is published in Agent Studio\n`;
          errorMessage += `3. Check endpoint: ${url}`;
        } else if (response.status === 502 || response.status === 504) {
          errorMessage = "The agent is taking too long to respond. This can happen when:\n";
          errorMessage += "• The agent is processing a complex query\n";
          errorMessage += "• The LLM (Gemini) API is experiencing delays\n";
          errorMessage += "• Network latency is high\n\n";
          errorMessage += "Try:\n";
          errorMessage += "1. A simpler, shorter query\n";
          errorMessage += "2. Wait a moment and try again";
        }
        
        setResponse(errorMessage);
        return;
      }

      const data = await response.json();
      console.log("✅ Response data:", data);

      // Extract text from Agent Studio response
      let content = "";
      
      if (data?.parts && Array.isArray(data.parts)) {
        content = data.parts
          .filter(p => p.type === 'text')
          .map(p => p.text)
          .join('\n');
      }

      if (!content) {
        // Fallback: show raw response for debugging
        content = `Debug - Raw response:\n${JSON.stringify(data, null, 2)}`;
      }

      setResponse(content || "No response content returned.");

    } catch (error) {
      console.error("💥 Network error:", error);
      setResponse(
        `Network error: ${error.message}\n\n` +
        `Endpoint: ${agentBaseUrl}\n` +
        `Agent ID: ${agentId}\n\n` +
        `Make sure:\n` +
        `1. Your agent is published in Agent Studio\n` +
        `2. The Agent ID is correct\n` +
        `3. Your API key has the right permissions`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>🔧 Build Buddy – AI PC Build Assistant</h1>

      <label className="input-label" htmlFor="build-query">
        Describe your budget or use case and I'll recommend compatible components.
      </label>
      
      <textarea
        id="build-query"
        className="query-input"
        placeholder="Example: I want to build a gaming PC with Ryzen 7 7800X3D"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={6}
      />

      <div className="actions">
        <button 
          onClick={askAgent} 
          disabled={!query.trim() || isLoading}
        >
          {isLoading ? "Thinking..." : "Ask Agent"}
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => {
            setQuery("");
            setResponse("");
          }}
          disabled={!query && !response}
        >
          Clear
        </button>
      </div>

      <pre className="response" aria-live="polite">
        {response || "Agent responses will appear here."}
      </pre>
      
      {/* Debug info - remove after testing */}
      <details style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', fontSize: '12px' }}>
        <summary>Debug Info (click to expand)</summary>
        <div style={{ marginTop: '10px' }}>
          <div>App ID: {appId ? `${appId.substring(0, 4)}...` : 'Not set'}</div>
          <div>Agent ID: {agentId ? `${agentId.substring(0, 8)}...` : 'Not set'}</div>
          <div>Search Key: {searchKey ? '••••••••' : 'Not set'}</div>
          <div>Base URL: {agentBaseUrl}</div>
          <div>Full URL: {agentBaseUrl}/agent-studio/1/agents/{agentId}/completions</div>
        </div>
      </details>
    </div>
  );
}