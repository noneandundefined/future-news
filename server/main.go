package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"future.server/internal/lib"
)

func main() {
	logger := lib.NewLogger()

	if err := godotenv.Load(); err != nil {
		logger.Error(err.Error())
	}

	// Найстрока и подключение к БД
	database.ConnectDB(os.Getenv("DSN"))
	db := database.GetDB()

	server := api.NewAPIServer(":8080", db)
	fmt.Println("\n" + `  _    _ _______ _______ _____
 | |  | |__   __|__   __|  __ \
 | |__| |  | |     | |  | |__) |
 |  __  |  | |     | |  |  ___/
 | |  | |  | |     | |  | |
 |_|  |_|  |_|     |_|  |_|

                                `)

	if err := server.Run(); err != nil {
		logger.Error(err.Error())
	}
}
