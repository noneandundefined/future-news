package types

import (
	"compress/gzip"
	"net/http"
)

type GzipResponseWriter struct {
	http.ResponseWriter
	Writer *gzip.Writer
}

type User struct {
	UUID     string `json:"uuid"`
	Login    string `json:"login"`
	Password string `json:"password"`
}

type SignupPayload struct {
	Login    string `json:"login" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type SigninPayload struct {
	Login    string `json:"login" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type SelectGalleryPayload struct {
	ID uint `json:"id" validate:"required"`
}
