package router

import (
	"go-react/ui"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
)

func ServeUI(app *fiber.App) {
	app.Use("/", filesystem.New(filesystem.Config{
		Root:       http.FS(ui.UI),
		PathPrefix: "dist",
	}))
}
