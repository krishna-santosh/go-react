package handlers

import (
	"go-react/database"
	"go-react/models"

	"log"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm/clause"
)

func SaveJoke(c *fiber.Ctx) error {
	db := database.DB
	var joke models.Joke

	joke.Id = c.Params("id")

	if err := c.BodyParser(&joke); err != nil {
		log.Printf("Couldn't parse the request body.\n%s\n", err.Error())
		c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	clauseCondition := clause.OnConflict{
		Columns:   []clause.Column{{Name: "id"}},
		DoUpdates: clause.AssignmentColumns([]string{"created_at"}),
	}

	if err := db.Clauses(clauseCondition).Create(&joke).Error; err != nil {
		log.Printf("Couldn't save the joke\n%s\n", err.Error())
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	log.Printf("Created joke %s successfully\n", joke.Id)
	return c.Status(201).JSON(joke)
}

func GetSavedJokes(c *fiber.Ctx) error {
	db := database.DB
	var jokes []models.Joke

	if err := db.Find(&jokes).Error; err != nil {
		log.Printf("Couldn't get the saved jokes\n%s\n", err.Error())
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	log.Printf("Retrieved saved jokes successfully.\n")
	return c.Status(200).JSON(jokes)
}

func DeleteSavedJoke(c *fiber.Ctx) error {
	db := database.DB
	id := c.Params("id")

	if err := db.Delete(&models.Joke{Id: id}).Error; err != nil {
		log.Printf("Couldn't delete the joke with id %s from the database.\n%s\n", id, err)
		c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	log.Printf("Deleted Joke %s successfully\n", id)
	return c.SendStatus(204)
}
