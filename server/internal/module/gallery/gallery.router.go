package gallery

import (
	"net/http"

	"future.server/internal/common/middleware"
	"github.com/gorilla/mux"
)

func (h Handler) RegisterRoutes(router *mux.Router) {
	galleryRouter := router.PathPrefix("/gallery").Subrouter()

	galleryRouter.Use(middleware.IsAuthenticated)

	galleryRouter.HandleFunc("", h.SetGalleryHandler).Methods(http.MethodPost)
	galleryRouter.HandleFunc("", h.GetGalleryHandler).Methods(http.MethodGet)
	galleryRouter.HandleFunc("/{id}", h.UpdateSelectGalleryHandler).Methods(http.MethodPut)
}
