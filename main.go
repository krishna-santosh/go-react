package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"go-react/database"
	"go-react/router"
)

func init() {
	database.ConnectDB()
}

func main() {
	app := fiber.New()

	app.Use(logger.New())
	app.Use(recover.New())

	// Use Explicit CORS policies in Production ⚠️.
	// Read More: https://docs.gofiber.io/api/middleware/cors/
	app.Use(cors.New(cors.Config{}))

	router.SetupRoutes(app)
	router.ServeUI(app)

	if err := app.Listen(":9000"); err != nil {
		log.Printf("Couldn't start the server\n%s\n", err.Error())
	}
}
