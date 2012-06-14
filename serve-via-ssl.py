#!/usr/bin/env python

"""
Simple script to serve the bookmarklet html and js via SSL. Useful for testing
that a bookmarklet works with SSL.
"""

import BaseHTTPServer, SimpleHTTPServer, ssl

HOSTNAME = 'lvh.me'
#HOSTNAME = 'localhost'

httpd = BaseHTTPServer.HTTPServer((HOSTNAME, 8000), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket, 
	certfile='ssl-certs/%s.cert' % HOSTNAME,
	keyfile='ssl-certs/%s.key' % HOSTNAME,
	server_side=True)
httpd.serve_forever()
