package main

import (
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

	app.Listen(":9000")
}
