package services

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/lib/pq"
	"github.com/skygenesisenterprise/giteria/server/src/interfaces"
)

type DatabaseService struct {
	db *sql.DB
}

func NewDatabaseService(databaseURL string) (interfaces.IDatabaseService, error) {
	if databaseURL == "" {
		return nil, fmt.Errorf("database URL is empty")
	}

	db, err := sql.Open("postgres", databaseURL)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(5 * time.Minute)

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return &DatabaseService{db: db}, nil
}

func (s *DatabaseService) GetDB() *sql.DB {
	return s.db
}

func (s *DatabaseService) Close() error {
	return s.db.Close()
}

func (s *DatabaseService) Ping() error {
	return s.db.Ping()
}
