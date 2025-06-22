package auth

import "net/http"

type Handler struct {
}

func NewHandler() *Handler {
	return &Handler{}
}

// Вход в аккаунт пользователя
func (h Handler) SigninHandler(w http.ResponseWriter, r *http.Request) {}
