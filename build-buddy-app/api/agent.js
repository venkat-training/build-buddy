export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

  if (!query || query.length < 3) {
    return res.status(400).json({ error: 'Query too short' });
  }

  const appId = process.env.VITE_ALGOLIA_APP_ID;
  const agentId = process.env.VITE_ALGOLIA_AGENT_ID;
  const searchKey = process.env.VITE_ALGOLIA_SEARCH_KEY;

  if (!appId || !agentId || !searchKey) {
    return res.status(500).json({ error: 'Missing configuration' });
  }

  try {
    const url = `https://${appId}.algolia.net/agent-studio/1/agents/${agentId}/completions?stream=false&compatibilityMode=ai-sdk-5`;

    console.log('Calling Algolia Agent Studio:', url);
    console.log('Query:', query);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-algolia-api-key': searchKey,
        'x-algolia-application-id': appId,
      },
      body: JSON.stringify({
        messages: [{
          role: 'user',
          parts: [{ text: query }]
        }]
      })
    });

    console.log('Algolia response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Algolia error:', errorText);
      return res.status(response.status).json({ 
        error: `Agent Studio error: ${response.status}`,
        details: errorText 
      });
    }

    const data = await response.json();
    console.log('Algolia response:', data);

    // Extract content from response
    let content = "";
    
    if (data?.parts && Array.isArray(data.parts)) {
      content = data.parts
        .filter(p => p.type === 'text')
        .map(p => p.text)
        .join('\n');
    } else if (data?.choices?.[0]?.message?.content) {
      content = data.choices[0].message.content;
    } else if (typeof data === 'string') {
      content = data;
    } else {
      content = JSON.stringify(data);
    }

    return res.status(200).json({ 
      content: content || "The agent didn't provide a response." 
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}