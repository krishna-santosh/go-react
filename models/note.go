package models

import (
	"gorm.io/gorm"
)

type Note struct {
	gorm.Model
	Note string `json:"note" validate:"required"`
}
