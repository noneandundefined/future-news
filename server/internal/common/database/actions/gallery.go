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

func GetGalleryByUserUUID(uuid string) ([]schema.Gallery, error) {
	logger := lib.NewLogger()
	db := database.GetDB()

	var gallery []schema.Gallery
	if err := db.Where("user_uuid = ?", uuid).First(&gallery).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		logger.Error(fmt.Sprintf("Database -> 'Error while fetching device: %v'", err))
		return nil, fmt.Errorf("Ошибка при выборе устройства.")
	}

	return &device, nil
}
