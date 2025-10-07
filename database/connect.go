package database

import (
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"go-react/models"
)

func ConnectDB() {
	var err error
	sqlite_db := "local.sqlite3"

	log.Println("Connecting to the Database...")
	DB, err = gorm.Open(sqlite.Open(sqlite_db), &gorm.Config{
		PrepareStmt: true,
	})
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Connected to the Database successfully.")

	makeMigrations()
}

func makeMigrations() {
	log.Println("Making Migrations...")
	err := DB.AutoMigrate(&models.Note{})
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Migrated successfully.")
}
