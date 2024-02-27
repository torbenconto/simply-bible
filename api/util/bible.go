package util

import (
	"github.com/torbenconto/bible"
	"github.com/torbenconto/bible/versions"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func InitVersion(version versions.Version) error {
	versionPath := filepath.Join("./versions/", strings.ToLower(version.Name))
	if _, err := os.Stat(versionPath); os.IsNotExist(err) {
		os.MkdirAll(versionPath, 0755)
	}

	if _, err := os.Stat(filepath.Join(versionPath, version.Path)); os.IsNotExist(err) {
		file, err := os.Create(filepath.Join(versionPath, version.Path))
		if err != nil {
			return err
		}
		defer file.Close()

		resp, err := http.Get(version.Url)
		if err != nil {
			return err
		}
		defer resp.Body.Close()

		_, err = io.Copy(file, resp.Body)
		if err != nil {
			return err
		}
	}

	return nil
}

func LoadVersion(version versions.Version) (*bible.Bible, error) {
	versionPath := filepath.Join("./versions", strings.ToLower(version.Name))
	file, err := os.Open(filepath.Join(versionPath, version.Path))
	if err != nil {
		return nil, err
	}

	b := bible.NewBible(version)
	if err != nil {
		return nil, err
	}

	b.LoadSourceFile(file)

	return b, nil
}
