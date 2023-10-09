package models

import "time"

type Joke struct {
	Id        string `gorm:"primarykey" json:"id" validate:"required"`
	Joke      string `json:"joke" validate:"required"`
	CreatedAt time.Time
}
