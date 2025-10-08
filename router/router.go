package router

import (
	"github.com/gofiber/fiber/v2"

	"go-react/handlers"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/api/notes", handlers.GetNotes)
	app.Post("/api/notes", handlers.CreateNote)
	app.Delete("/api/notes/:id", handlers.DeleteNote)
}
