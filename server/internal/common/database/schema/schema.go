package schema

import "time"

type Users struct {
	ID        uint      `gorm:"primarykey" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	UUID      string    `gorm:"unique;size:255;not null" json:"uuid"`
}
