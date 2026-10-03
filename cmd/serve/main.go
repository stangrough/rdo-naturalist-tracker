// Command serve hosts src/ on localhost for user testing.
//
// The published site is static, so this is deliberately tiny: a file server
// with caching turned off plus a request log, so a reload always shows the
// current state of the working tree.
//
//	go run ./cmd/serve             # http://127.0.0.1:1234
//	go run ./cmd/serve -addr :1234 # reachable from the LAN
//	go run ./cmd/serve -open=false # do not launch a browser
package main

import (
	"errors"
	"flag"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
)

func main() {
	addr := flag.String("addr", "127.0.0.1:1234", "listen address, e.g. 0.0.0.0:1234 to expose on the LAN")
	dir := flag.String("dir", defaultDir(), "directory to serve")
	open := flag.Bool("open", true, "open the default browser once the server is up")
	flag.Parse()

	root, err := filepath.Abs(*dir)
	if err != nil {
		log.Fatalf("cannot resolve %s: %v", *dir, err)
	}
	if _, err := os.Stat(filepath.Join(root, "index.html")); err != nil {
		log.Fatalf("no index.html in %s (run from the repository root or pass -dir)", root)
	}

	// Only the site directory is exposed; nothing above it is reachable.
	handler := noCache(http.FileServer(http.Dir(root)))

	listener, err := net.Listen("tcp", *addr)
	if err != nil {
		log.Fatalf("cannot listen on %s: %v", *addr, err)
	}
	url := browserURL(listener.Addr().String())

	log.Printf("serving %s on %s (Ctrl+C to stop)", root, url)
	if *open {
		go openBrowser(url)
	}
	if err := http.Serve(listener, handler); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatal(err)
	}
}

// defaultDir points at src/ relative to the repository root, so `go run
// ./cmd/serve` works without arguments.
func defaultDir() string {
	if _, err := os.Stat("src/index.html"); err == nil {
		return "src"
	}
	return "."
}

// noCache keeps the browser from holding on to an older app.js or language file
// while you are editing them.
func noCache(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store, max-age=0")
		next.ServeHTTP(w, r)
	})
}

// browserURL turns a listen address into something a browser accepts
// (0.0.0.0 and [::] are not routable).
func browserURL(addr string) string {
	host, port, err := net.SplitHostPort(addr)
	if err != nil {
		return "http://" + addr
	}
	if host == "" || host == "0.0.0.0" || host == "::" || host == "[::]" {
		host = "127.0.0.1"
	}
	if strings.Contains(host, ":") {
		host = "[" + host + "]"
	}
	return fmt.Sprintf("http://%s:%s", host, port)
}

func openBrowser(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "darwin":
		cmd = exec.Command("open", url)
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	if err := cmd.Start(); err != nil {
		log.Printf("could not open a browser (%v) - open %s yourself", err, url)
	}
}
