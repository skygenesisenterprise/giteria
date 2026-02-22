package services

import (
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"fmt"
)

type ServiceKeyService struct {
	db *sql.DB
}

func NewServiceKeyService(db *sql.DB) *ServiceKeyService {
	return &ServiceKeyService{db: db}
}

func (s *ServiceKeyService) ValidateSystemKey(key string) (bool, error) {
	if s.db == nil {
		return false, fmt.Errorf("database not initialized")
	}

	var exists bool
	err := s.db.QueryRow("SELECT EXISTS(SELECT 1 FROM service_keys WHERE key = $1 AND active = TRUE)", key).Scan(&exists)
	if err != nil {
		return false, fmt.Errorf("failed to validate system key: %w", err)
	}

	return exists, nil
}

func (s *ServiceKeyService) GenerateSystemKey() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", fmt.Errorf("failed to generate random key: %w", err)
	}

	key := hex.EncodeToString(bytes)

	if s.db != nil {
		_, err := s.db.Exec(`
			CREATE TABLE IF NOT EXISTS service_keys (
				id SERIAL PRIMARY KEY,
				key VARCHAR(255) NOT NULL UNIQUE,
				active BOOLEAN DEFAULT TRUE,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			)
		`)
		if err != nil {
			return "", fmt.Errorf("failed to create service_keys table: %w", err)
		}

		_, err = s.db.Exec("INSERT INTO service_keys (key) VALUES ($1)", key)
		if err != nil {
			return "", fmt.Errorf("failed to store service key: %w", err)
		}
	}

	return key, nil
}
