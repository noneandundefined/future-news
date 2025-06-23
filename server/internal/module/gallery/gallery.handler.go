package gallery

import (
	"io"
	"net/http"

	"future.server/internal/common/database/actions"
	"future.server/internal/common/database/schema"
	"future.server/internal/common/utils"
)

type Handler struct {
}

func NewHandler() *Handler {
	return &Handler{}
}

func (h Handler) SetGalleryHandler(w http.ResponseWriter, r *http.Request) {
	user := r.Context().Value("identity").(*schema.Users)

	r.ParseMultipartForm(10 << 20)

	file, handler, err := r.FormFile("photo")
	if err != nil {
		utils.WriteJSON(w, r, http.StatusBadRequest, "couldn't get the file")
		return
	}
	defer file.Close()

	fileBytes, err := io.ReadAll(file)
	if err != nil {
		utils.WriteJSON(w, r, http.StatusInternalServerError, "file reading error")
		return
	}

	photo := schema.Gallery{
		UserUUID: user.UUID,
		Content:  fileBytes,
		Name:     handler.Filename,
		Format:   handler.Header.Get("Content-Type"),
	}

	if err := actions.CreateGallery(&photo); err != nil {
		utils.WriteJSON(w, r, http.StatusBadRequest, err.Error())
		return
	}

	utils.WriteJSON(w, r, http.StatusOK, "successfully adding a photo to the gallery")
}

func (h Handler) GetGalleryHandler(w http.ResponseWriter, r *http.Request) {
	user := r.Context().Value("identity").(*schema.Users)

	gallery, err := actions.GetGalleryByUserUUID(user.UUID)
	if err != nil {
		utils.WriteJSON(w, r, http.StatusBadRequest, err.Error())
		return
	}

	utils.CacheJSON(w, 60)
	utils.WriteJSON(w, r, http.StatusOK, gallery)
}
