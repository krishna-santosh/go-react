package handlers

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"go-react/database"
	"go-react/models"
)

func CreateNote(c *fiber.Ctx) error {
	db := database.DB
	var note models.Note

	if err := c.BodyParser(&note); err != nil {
		log.Printf("Couldn't parse the request body.\n%s\n", err.Error())
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	if err := db.Create(&note).Error; err != nil {
		log.Printf("Couldn't save the note\n%s\n", err.Error())
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(201).JSON(note)
}

func GetNotes(c *fiber.Ctx) error {
	db := database.DB
	var notes []models.Note

	if err := db.Find(&notes).Error; err != nil {
		log.Printf("Couldn't get the saved notes\n%s\n", err.Error())
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(200).JSON(notes)
}

func DeleteNote(c *fiber.Ctx) error {
	db := database.DB
	id, err := c.ParamsInt("id")

	if err != nil {
		log.Printf("Couldn't parse the Id. \n %s\n", err)
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	if err := db.Where("ID = ?", uint(id)).Delete(&models.Note{}).Error; err != nil {
		log.Printf("Couldn't delete the note with id %d from the database.\n%s\n", id, err)
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.SendStatus(204)
}
