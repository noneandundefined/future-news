package actions

import (
	"errors"
	"fmt"

	"future.server/internal/common/database"
	"future.server/internal/common/database/schema"
	"future.server/internal/lib"
	"gorm.io/gorm"
)

func CreateUser(user schema.Users) error {
	logger := lib.NewLogger()
	db := database.GetDB()

	if err := db.Create(&user).Error; err != nil {
		logger.Error(fmt.Sprintf("Database -> 'Failed to create user: %v'", err))
		return fmt.Errorf("failed to create a user")
	}

	return nil
}

func GetUserByLogin(login string) (*schema.Users, error) {
	logger := lib.NewLogger()
	db := database.GetDB()

	var user schema.Users
	if err := db.Where("login = ?", login).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		logger.Error(fmt.Sprintf("Database -> 'Error while fetching user: %v'", err))
		return nil, fmt.Errorf("error when selecting a user")
	}

	return &user, nil
}

func GetUserByUUID(uuid string) (*schema.Users, error) {
	logger := lib.NewLogger()
	db := database.GetDB()

	var user schema.Users
	if err := db.Where("uuid = ?", uuid).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		logger.Error(fmt.Sprintf("Database -> 'Error while fetching user: %v'", err))
		return nil, fmt.Errorf("error when selecting a user")
	}

	return &user, nil
}
