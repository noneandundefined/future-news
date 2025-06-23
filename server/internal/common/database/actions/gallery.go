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
	if err := db.Model(&schema.Devices{}).Select("imei").Where("client_id = ?", id).Scan(&onlyDevices).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return []schema.OnlyDevice{}, nil
		}

		logger.Error(fmt.Sprintf("Database -> 'Error while fetching only device: %v'", err))
		return []schema.OnlyDevice{}, fmt.Errorf("Ошибка при выборе устройств")
	}

	return onlyDevices, nil
}
