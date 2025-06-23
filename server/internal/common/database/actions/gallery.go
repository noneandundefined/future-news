package actions

import (
	"errors"
	"fmt"

	"future.server/internal/common/database"
	"future.server/internal/common/database/schema"
	"future.server/internal/lib"
	"gorm.io/gorm"
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
	if err := db.Where("user_uuid = ?", uuid).Find(&gallery).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		logger.Error(fmt.Sprintf("Database -> 'Error while fetching gallery: %v'", err))
		return nil, fmt.Errorf("error when selecting photos from the gallery.")
	}

	return gallery, nil
}

func UpdateSelectGalleryById(id uint) error {
	logger := lib.NewLogger()
	db := database.GetDB()

	if err := db.Model(&schema.Gallery{}).Where("id = ?", id).Update("select", true).Error; err != nil {
		logger.Error(fmt.Sprintf("Database -> 'Error while fetching gallery: %v'", err))
		return fmt.Errorf("error when selecting photos from the gallery.")
	}

	return nil
}

func UpdateAllSelectToFalse
