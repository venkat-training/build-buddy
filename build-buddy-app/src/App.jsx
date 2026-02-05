import { useState } from "react";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const appId = import.meta.env.VITE_ALGOLIA_APP_ID;
  const agentId = import.meta.env.VITE_ALGOLIA_AGENT_ID;
  const searchKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY;
  const defaultAgentBaseUrls = appId
    ? [
        `https://${appId}.algolia.com`,
        `https://${appId}-dsn.algolia.net`,
        `https://${appId}.algolia.net`,
      ]
    : [];
  const configuredAgentBaseUrl = import.meta.env.VITE_ALGOLIA_AGENT_BASE_URL;
  let lastUrl = "";

  const buildAgentUrls = (baseUrls) => {
    const completionsPath = `/1/agents/${agentId}/completions?compatibilityMode=ai-sdk-5`;
    const urls = new Set();

    baseUrls.forEach((baseUrl) => {
      if (!baseUrl) return;
      const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");

      if (normalizedBaseUrl.includes("/agent-studio")) {
        urls.add(`${normalizedBaseUrl}${completionsPath}`);
        urls.add(
          `${normalizedBaseUrl.replace(/\/agent-studio$/, "")}${completionsPath}`
        );
      } else {
        urls.add(`${normalizedBaseUrl}/agent-studio${completionsPath}`);
        urls.add(`${normalizedBaseUrl}${completionsPath}`);
      }
    });

    return Array.from(urls);
  };

  async function askAgent() {
    if (!appId || !agentId || !searchKey) {
      setResponse(
        "Missing Algolia configuration. Please set VITE_ALGOLIA_APP_ID, " +
          "VITE_ALGOLIA_AGENT_ID, and VITE_ALGOLIA_SEARCH_KEY."
      );
      return;
    }

    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-algolia-api-key": searchKey,
          "x-algolia-application-id": appId,
          Accept: "text/event-stream, application/json",
        },
        body: JSON.stringify({
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
        }),
      };

      const candidateBaseUrls = configuredAgentBaseUrl
        ? [configuredAgentBaseUrl, ...defaultAgentBaseUrls]
        : defaultAgentBaseUrls;
      const candidateUrls = buildAgentUrls(candidateBaseUrls);
      let res = null;

      for (const url of candidateUrls) {
        lastUrl = url;
        const attempt = await fetch(url, requestOptions);
        res = attempt;
        if (attempt.ok || attempt.status !== 404) {
          break;
        }
      }

      if (!res.ok) {
        const errorText = await res.text();
        const notFoundHint =
          res.status === 404
            ? "Agent endpoint not found. Confirm the Agent ID and set VITE_ALGOLIA_AGENT_BASE_URL to the API endpoint shown in Agent Studio."
            : "";
        setResponse(
          `Request failed (${res.status}): ${errorText || res.statusText} ${notFoundHint}`.trim()
        );
        return;
      }

      const contentType = res.headers.get("content-type") || "";
      const isEventStream = contentType.includes("text/event-stream");

      const extractContent = (data) =>
        data?.text ||
        data?.output_text ||
        data?.choices?.[0]?.message?.content ||
        data?.choices?.[0]?.delta?.content ||
        data?.message?.content?.[0]?.text ||
        data?.output?.[0]?.content?.[0]?.text ||
        "";

      if (!res.body || !isEventStream) {
        const data = await res.json();
        const content = extractContent(data);
        setResponse(content || "No response content returned.");
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
            const content = extractContent(data);

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
      const baseUrlHint = configuredAgentBaseUrl
        ? `Using VITE_ALGOLIA_AGENT_BASE_URL=${configuredAgentBaseUrl}.`
        : "No VITE_ALGOLIA_AGENT_BASE_URL set; using Algolia defaults.";
      const urlHint = lastUrl ? `Last attempted URL: ${lastUrl}` : "";
      setResponse(
        [
          `Network error: ${error.message}. Verify the agent base URL and DNS.`,
          baseUrlHint,
          urlHint,
          "If the host does not resolve, copy the API endpoint from Agent Studio and set VITE_ALGOLIA_AGENT_BASE_URL.",
        ]
          .filter(Boolean)
          .join(" ")
      );
    }
  }

  return (
    <div className="app">
      <h1>Build Buddy</h1>

      <label className="input-label" htmlFor="build-query">
        Describe your PC build or paste diagnostics
      </label>
      <textarea
        id="build-query"
        className="query-input"
        placeholder="Describe your PC build..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={6}
      />

      <div className="actions">
        <button onClick={askAgent} disabled={!query.trim()}>
          Ask Agent
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
    </div>
  );
}
