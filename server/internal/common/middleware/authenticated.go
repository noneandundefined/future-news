// nolint
package middleware

import (
	"context"
	"net/http"

	"future.server/internal/common/database/actions"
	"future.server/internal/common/utils"
)

// Middleware для проверки на аутентифицированного пользователя
func IsAuthenticated(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("auth-token")
		if err != nil || cookie == nil {
			utils.WriteJSON(w, r, http.StatusUnauthorized, "log in to your account.")
			return
		}

		_uuid, err := utils.Decrypt(cookie.Value)
		if err != nil {
			utils.WriteJSON(w, r, http.StatusUnauthorized, "log in to your account.")
			return
		}

		user, err := actions.GetUserByUUID(_uuid)
		if err != nil || user == nil {
			utils.WriteJSON(w, r, http.StatusUnauthorized, "log in to your account.")
			return
		}

		//nolint
		ctx := context.WithValue(r.Context(), "identity", user)
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}
