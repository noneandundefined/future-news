package schema

import "time"

type Users struct {
	ID        uint      `gorm:"primarykey" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	UUID      string    `gorm:"unique;size:255;not null" json:"uuid"`
	Login     string    `gorm:"unique;size:100;not null" json:"login"`
	Password  string    `gorm:"size:255;not null" json:"password"`
}

type Gallery struct {
	ID        uint      `gorm:"primarykey" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	UserUUID  string    `gorm:"size:255;not null" json:"user_uuid"`
	Select    bool      `gorm:"not null;default:false" json:"select"`
	Content   []byte    `gorm:"not null" json:"content"`
	Name      string    `gorm:"size:255;not null" json:"name"`
	Format    string    `gorm:"size:50;not null" json:"format"`
}

type Chats struct {
	ID        uint      `gorm:"primarykey" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	StreamId  uint      `json:"stream_id"`
	Message   string    `gorm:"not null" json:"message"`
}

type Streams struct {
	ID        uint      `gorm:"primarykey" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Streamer  string    `gorm:"not null" json:"streamer"`
	Views     uint      `gorm:"not null;default:0" json:"views"`
}
