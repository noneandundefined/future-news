package gallery

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (h Handler) RegisterRoutes(router *mux.Router) {
	authRouter := router.PathPrefix("/gallery").Subrouter()

	authRouter.HandleFunc("", h.SetGalleryHandler).Methods(http.MethodPost)
}
