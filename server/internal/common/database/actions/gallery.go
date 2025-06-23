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

	var gallery []schema.DevicesWithSyncs
	err := db.Table("devices").
		Select("devices.id as id, devices.client_id, devices.name, devices.imei, devices.password, devices.status, devices.phone, devices.group, devices.device_model, devices.auto_update, devices.request_configuration_on_connect, devices.connect, devices.updated_at, syncs.device_id as device_id, syncs.firmware_version, syncs.cfg_version, syncs.last_mode_time, syncs.cfg_hash").
		Joins("left join syncs on syncs.device_id = devices.id").
		Where("devices.client_id = ?", id).
		Find(&devicesWithSyncs).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return []schema.DevicesWithSyncs{}, nil
		}

		logger.Error(fmt.Sprintf("Database -> 'Error while fetching device or sync: %v'", err))
		return []schema.DevicesWithSyncs{}, fmt.Errorf("Ошибка при выборе устройств")
	}

	return devicesWithSyncs, nil
}
