package router

import (
	"go-react/handlers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/api/jokes/", handlers.GetSavedJokes)
	app.Post("/api/jokes/:id/save", handlers.SaveJoke)
	app.Delete("/api/jokes/:id/delete", handlers.DeleteSavedJoke)
}
