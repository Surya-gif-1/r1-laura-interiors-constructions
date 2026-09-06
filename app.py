import http.server
import socketserver
import webbrowser
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 60)
        print("   R1 LAURA - CONSTRUCTION & INTERIORS LOCAL SERVER")
        print("=" * 60)
        print(f" > Website URL : http://localhost:{PORT}")
        print(f" > Admin URL   : http://localhost:{PORT}/admin/")
        print("=" * 60)
        print(" Press Ctrl+C to stop the server.\n")
        
        # Open in default web browser automatically
        webbrowser.open(f"http://localhost:{PORT}")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped successfully.")
            httpd.server_close()
