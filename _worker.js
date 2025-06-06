// _worker.js
export default {
  async fetch(request, env) {
    // GitHub Raw URL for channels.json (replace with your file path)
    const GITHUB_RAW_URL = "https://raw.githubusercontent.com/magi17/Ch/refs/heads/main/channels.json";
    
    // Allowed Android package name (case-sensitive)
    const ALLOWED_PACKAGE = "com.markprojects.tv2";

    // Check User-Agent header for the allowed package
    const userAgent = request.headers.get("User-Agent") || "";
    const isAuthorized = userAgent.includes(ALLOWED_PACKAGE);

    // Block unauthorized requests
    if (!isAuthorized) {
      return new Response("Unauthorized: This endpoint is restricted.\n\nFuck you ka HAHAHAHAHAH", {
        status: 418, // HTTP 418 I'm a teapot (or use 401/403)
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Fetch and return the JSON for authorized requests
    try {
      const response = await fetch(GITHUB_RAW_URL);
      if (!response.ok) throw new Error("GitHub fetch failed");
      
      const jsonData = await response.text();
      return new Response(jsonData, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
      });
    } catch (error) {
      return new Response("Failed to fetch data from GitHub", { status: 502 });
    }
  },
};
