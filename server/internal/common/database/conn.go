package database

import (
	"future.server/internal/common/database/schema"
	"future.server/internal/lib"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var db *gorm.DB

// Подключение к БД
func ConnectDB(dsn string) {
	loggerApp := lib.NewLogger()

	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Discard,
	})
	if err != nil {
		loggerApp.Error(err.Error())
	}

	err = db.AutoMigrate(&schema.Users{}, &schema.Chats{})
	if err != nil {
		loggerApp.Error(err.Error())
	}

	loggerApp.Info("Migration completed successfully.")
	loggerApp.Info("Successfully connected to database!")
}

// Получения подключения к БД
func GetDB() *gorm.DB {
	return db
}
