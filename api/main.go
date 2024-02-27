package main

import (
	"encoding/json"
	"github.com/torbenconto/bible"
	"github.com/torbenconto/bible/versions"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

func init() {
	log.Println("Initializing versions...")
	// Check over the versions and download them if they are not already downloaded
	for _, version := range versions.Versions {
		log.Println("Initializing version", version.Name)
		versionPath := filepath.Join("./versions/", strings.ToLower(version.Name))
		if _, err := os.Stat(versionPath); os.IsNotExist(err) {
			os.MkdirAll(versionPath, 0755)
		}

		if _, err := os.Stat(filepath.Join(versionPath, version.Path)); os.IsNotExist(err) {
			file, err := os.Create(filepath.Join(versionPath, version.Path))
			if err != nil {
				log.Fatalf("Failed to create version file: %v", err)
			}
			defer file.Close()

			resp, err := http.Get(version.Url)
			if err != nil {
				log.Fatalf("Failed to download version file: %v", err)
			}
			defer resp.Body.Close()

			_, err = io.Copy(file, resp.Body)
			if err != nil {
				log.Fatalf("Failed to write version file: %v", err)
			}
		}
		log.Println("Initialized version", version.Name)
	}
	log.Println("Versions initialized")
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/bible", func(w http.ResponseWriter, r *http.Request) {
		version := strings.ToUpper(r.URL.Query().Get("version"))
		book := strings.ToLower(r.URL.Query().Get("book"))
		chapter := r.URL.Query().Get("chapter")

		chapterInt, err := strconv.Atoi(chapter)
		if err != nil {
			http.Error(w, "Invalid chapter", http.StatusBadRequest)
			return
		}

		if _, ok := versions.VersionMap[version]; !ok {
			http.Error(w, "Invalid version", http.StatusBadRequest)
			return
		}

		if book == "" {
			http.Error(w, "Invalid book", http.StatusBadRequest)
			return
		}

		newBible := bible.NewBible(versions.VersionMap[version])

		versionPath := filepath.Join("./versions", strings.ToLower(version))

		// Open the version file
		file, err := os.Open(filepath.Join(versionPath, versions.VersionMap[version].Path))
		if err != nil {
			http.Error(w, "Failed to open version file", http.StatusInternalServerError)
			return
		}

		// Load the version file
		newBible.LoadSourceFile(file)

		verses := []bible.Verse{}

		for _, b := range newBible.Books {
			if strings.ToLower(b.Name) == book {
				for _, c := range b.Chapters {
					if c.Number == chapterInt {
						for _, v := range c.Verses {
							verses = append(verses, bible.Verse{Name: v.Name, Text: v.Text})
						}
					}
				}
			}
		}

		jsonVerses, err := json.Marshal(verses)
		if err != nil {
			http.Error(w, "Failed to convert verses to JSON", http.StatusInternalServerError)
			return
		}

		w.Write(jsonVerses)

		file.Close()
	})

	http.ListenAndServe(":8080", mux)
}
