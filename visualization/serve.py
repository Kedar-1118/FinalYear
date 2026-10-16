"""Lightweight local web server launcher for the MABSplit Visualization Dashboard.
Run:
    python visualization/serve.py [port]
"""

import http.server
import socketserver
import webbrowser
import os
import sys

DEFAULT_PORT = 8080

def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)

    handler = http.server.SimpleHTTPRequestHandler
    
    # Try preferred port, increment if occupied
    max_tries = 10
    httpd = None
    for p in range(port, port + max_tries):
        try:
            httpd = socketserver.TCPServer(("", p), handler)
            port = p
            break
        except OSError:
            continue

    if not httpd:
        print(f"Error: Could not bind to port in range {port}-{port + max_tries}")
        sys.exit(1)

    url = f"http://localhost:{port}/index.html"
    print("=" * 65)
    print("🚀 MABSplit Dataset Analysis & Split Visualization Dashboard")
    print("=" * 65)
    print(f"Server serving directory: {web_dir}")
    print(f"Access Dashboard URL:    {url}")
    print("=" * 65)
    print("Press Ctrl+C to terminate the local server.\n")

    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer gracefully shut down.")

if __name__ == "__main__":
    main()
