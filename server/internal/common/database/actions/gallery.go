package actions

import (
	"fmt"

	"future.server/internal/common/database"
	"future.server/internal/common/database/schema"
	"future.server/internal/lib"
)

func CreateGallery(gallery *schema.Gallery) error {
	logger := lib.NewLogger()
	db := database.GetDB()

	if err := db.Create(gallery).Error; err != nil {
		logger.Error(fmt.Sprintf("Database -> 'Failed to add photo to gallery: %v'", err))
		return fmt.Errorf("couldn't add photo to gallery")
	}

	return nil
}
