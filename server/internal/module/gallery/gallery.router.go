package gallery

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (h Handler) RegisterRoutes(router *mux.Router) {
	galleryRouter := router.PathPrefix("/gallery").Subrouter()

	galleryRouter.HandleFunc("", h.SetGalleryHandler).Methods(http.MethodPost)
	galleryRouter.HandleFunc("", h.GetGalleryHandler).Methods(http.MethodGet)
}
