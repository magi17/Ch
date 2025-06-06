// _worker.js
export default {
  async fetch(request, env) {
    // GitHub Raw URL for channels.json (replace with your file path)
    const GITHUB_RAW_URL = "https://raw.githubusercontent.com/magi17/Ch/refs/heads/main/channels.json";

    try {
      // Fetch the JSON file from GitHub
      const response = await fetch(GITHUB_RAW_URL);

      if (!response.ok) {
        return new Response("Failed to fetch JSON from GitHub", { status: 502 });
      }

      // Get the JSON data
      const jsonData = await response.text();

      // Return the JSON with proper headers
      return new Response(jsonData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Enable CORS if needed
          "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        },
      });
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
