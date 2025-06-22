package auth

type Handler struct {
}

func NewHandler(monitor *vision.Vision, errors *packages.Errors) *Handler {
	return &Handler{
		monitor: monitor,
		errors:  errors,
	}
}

// Вход в аккаунт пользователя
func (h Handler) SigninHandler(w http.ResponseWriter, r *http.Request) {
