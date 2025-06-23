package auth

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (h Handler) RegisterRoutes(router *mux.Router) {
	authRouter := router.PathPrefix("/auth").Subrouter()

	authRouter.HandleFunc("/signin", h.SigninHandler).Methods(http.MethodPost)
	authRouter.HandleFunc("/signup", h.SignupHandler).Methods(http.MethodPost)
}
