# Cache Inspector Dashboard

[Live Preview](https://illia-001.github.io/cache_inspector_dashboard/)

# Functional blocks

### Session Token

- Generation of a random token (Base64 URL-safe, 64 characters).
- Stored in localStorage along with the creation time.
- Display of the token, creation time, and age.
- Clear Cache button to delete the token.

### Live Metrics

- Pseudo-metrics: CPU %, Memory %, Active Sessions.
- Auto-refresh every 5 seconds (can be paused/resumed).
- Visualization via progress bars with dynamic highlighting.

### Cache Inspector

- Table with localStorage keys: key, value, creation date.
- Refresh and Clear Cache buttons.
- Highlighting of the main cache_token key.

### Request Log

- Log of the last 10 requests (simulated fetch or real public API).
- For each entry: time, status, delay (ms).
- Filtering by status: All / Success / Error.

# Technologies

- React + TypeScript
- Zustand for global state
- Tailwind CSS for styling
- Fetch API for logs
- LocalStorage for cache and token
