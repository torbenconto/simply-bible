package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/torbenconto/bible"
	"github.com/torbenconto/bible/api/util"
	"github.com/torbenconto/bible/versions"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func init() {
	log.Println("Initializing versions...")
	for _, version := range versions.Versions {
		log.Println("Initializing version", version.Name)

		err := util.InitVersion(version)
		if err != nil {
			log.Println("Failed to initialize version", version.Name, ":", err)
			continue
		}

		log.Println("Initialized version", version.Name)
	}
	log.Println("Versions initialized")
}

func main() {
	r := gin.Default()

	r.Use(cors.Default()) // Add CORS middleware

	r.GET("/book/:book", func(c *gin.Context) {
		version := strings.ToUpper(c.Query("version"))
		book := strings.ToLower(c.Param("book"))

		if _, ok := versions.VersionMap[version]; !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid version"})
			return
		}

		if book == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid book"})
			return
		}

		newBible := bible.NewBible(versions.VersionMap[version])

		versionPath := filepath.Join("./versions", strings.ToLower(version))

		file, err := os.Open(filepath.Join(versionPath, versions.VersionMap[version].Path))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open version file"})
			return
		}
		defer file.Close()

		newBible.LoadSourceFile(file)

		for _, b := range newBible.Books {
			if strings.ToLower(b.Name) == book {
				c.JSON(http.StatusOK, b)
				return
			}
		}

		c.JSON(http.StatusBadRequest, gin.H{"error": "Book not found"})
	})

	r.GET("/versions", func(c *gin.Context) {
		c.JSON(http.StatusOK, versions.Versions)
	})

	r.GET("/books", func(c *gin.Context) {
		version := strings.ToUpper(c.Query("version"))

		if _, ok := versions.VersionMap[version]; !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid version"})
			return
		}

		b, err := util.LoadVersion(versions.VersionMap[version])
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load version"})
			return
		}

		// Return book names only
		var bookNames []string
		for _, book := range b.Books {
			bookNames = append(bookNames, book.Name)
		}
		c.JSON(http.StatusOK, bookNames)
	})

	r.GET("/chaptercount/:book", func(c *gin.Context) {
		version := strings.ToUpper(c.Query("version"))
		book := strings.ToLower(c.Param("book"))

		if _, ok := versions.VersionMap[version]; !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid version"})
			return
		}

		if book == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid book"})
			return
		}

		newBible, err := util.LoadVersion(versions.VersionMap[version])
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load version"})
			return
		}

		for _, b := range newBible.Books {
			if strings.ToLower(b.Name) == book {
				c.JSON(http.StatusOK, len(b.Chapters))
				return
			}
		}

		c.JSON(http.StatusBadRequest, gin.H{"error": "Book not found"})
	})

	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server: ", err)
	}
}
