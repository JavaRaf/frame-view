#!/usr/bin/env python3
"""
Simple HTTP server for testing the frame-view project locally.
Starts a server on port 8000 by default.
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# Default port
PORT = 8000

# Get the directory where this script is located
SCRIPT_DIR = Path(__file__).parent.absolute()
os.chdir(SCRIPT_DIR)

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom request handler with CORS headers and better error messages."""
    
    def end_headers(self):
        # Add CORS headers to allow cross-origin requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        """Override to provide cleaner log messages."""
        print(f"[{self.address_string()}] {format % args}")

def main():
    """Start the HTTP server."""
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print("=" * 60)
            print("Frame Viewer - Local Test Server")
            print("=" * 60)
            print(f"\nServer running at:")
            print(f"  Desktop: http://localhost:{PORT}/desktop/")
            print(f"  Mobile:  http://localhost:{PORT}/mobile/")
            print(f"\nServing directory: {SCRIPT_DIR}")
            print(f"\nPress Ctrl+C to stop the server")
            print("=" * 60)
            print()
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\nServer stopped by user.")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48 or e.errno == 98:  # Address already in use
            print(f"\nError: Port {PORT} is already in use!")
            print(f"Please close the application using port {PORT} or change the PORT variable.")
            sys.exit(1)
        else:
            print(f"\nError starting server: {e}")
            sys.exit(1)

if __name__ == "__main__":
    main()
