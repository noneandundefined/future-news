package auth

import (
	"net/http"
	"strings"
	"time"

	"future.server/internal/common/database/actions"
	"future.server/internal/common/database/schema"
	"future.server/internal/common/utils"
	"future.server/internal/types"
	"github.com/google/uuid"
)

type Handler struct {
}

func NewHandler() *Handler {
	return &Handler{}
}

// Вход в аккаунт пользователя
func (h Handler) SigninHandler(w http.ResponseWriter, r *http.Request) {
	var payload *types.SigninPayload

	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteJSON(w, r, http.StatusBadRequest, err)
	}

	if err := utils.Validate.Struct(payload); err != nil {
		utils.WriteJSON(w, r, http.StatusBadRequest, "not all fields are filled in")
		return
	}

	user, err := actions.GetUserByLogin(strings.TrimSpace(payload.Login))
	if err != nil {
		utils.WriteJSON(w, r, http.StatusInternalServerError, err.Error())
		return
	}

	if user == nil {
		utils.WriteJSON(w, r, http.StatusBadRequest, "the user was not found")
		return
	}

	passwordHashed, err := utils.Encrypt(strings.TrimSpace(payload.Password))
	if err != nil {
		utils.WriteJSON(w, r, http.StatusInternalServerError, err)
		return
	}

	// Сверка паролей
	if passwordHashed != user.Password {
		utils.WriteJSON(w, r, http.StatusBadRequest, "the user was not found")
		return
	}

	hashedIndex, err := utils.Encrypt(user.UUID)
	if err != nil {
		utils.WriteJSON(w, r, http.StatusInternalServerError, err)
		return
	}

	cookie := &http.Cookie{
		Name:     "auth-token",
		Value:    hashedIndex,
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour),
		SameSite: http.SameSiteStrictMode,
	}
	http.SetCookie(w, cookie)

	utils.WriteJSON(w, r, http.StatusOK, "welcome back Thef!")
}

func (h Handler) SignupHandler(w http.ResponseWriter, r *http.Request) {
	var payload types.SignupPayload

	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteJSON(w, r, http.StatusBadRequest, err)
	}

	if err := utils.Validate.Struct(payload); err != nil {
		utils.WriteJSON(w, r, http.StatusBadRequest, "not all fields are filled in")
		return
	}

	existingUser, err := actions.GetUserByLogin(strings.TrimSpace(payload.Login))
	if err != nil {
		utils.WriteJSON(w, r, http.StatusInternalServerError, err.Error())
		return
	}

	if existingUser != nil {
		utils.WriteJSON(w, r, http.StatusBadRequest, "the login is busy")
		return
	}

	passwordHash, err := utils.Encrypt(payload.Password)
	if err != nil {
		utils.WriteJSON(w, r, http.StatusInternalServerError, err.Error())
		return
	}

	user := schema.Users{
		UUID:     uuid.NewString(),
		Login:    payload.Login,
		Password: passwordHash,
	}

	if err := actions.CreateUser(user); err != nil {
		utils.WriteJSON(w, r, http.StatusBadRequest, err.Error())
		return
	}

	utils.WriteJSON(w, r, http.StatusCreated, "the user has been successfully created!")
}
