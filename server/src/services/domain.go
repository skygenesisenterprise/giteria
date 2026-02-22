package services

import (
	"database/sql"
	"fmt"
)

type DomainService struct {
	db *sql.DB
}

func NewDomainService(db *sql.DB) *DomainService {
	return &DomainService{db: db}
}

func (s *DomainService) InitializeDefaultDomains() error {
	if s.db == nil {
		return fmt.Errorf("database not initialized")
	}

	var count int
	err := s.db.QueryRow("SELECT COUNT(*) FROM domains").Scan(&count)
	if err != nil && err != sql.ErrNoRows {
		return fmt.Errorf("failed to check domains: %w", err)
	}

	if count > 0 {
		return nil
	}

	_, err = s.db.Exec(`
		CREATE TABLE IF NOT EXISTS domains (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL UNIQUE,
			is_default BOOLEAN DEFAULT FALSE,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		return fmt.Errorf("failed to create domains table: %w", err)
	}

	_, err = s.db.Exec(`
		INSERT INTO domains (name, is_default) VALUES ('giteria.com', TRUE)
	`)
	if err != nil {
		return fmt.Errorf("failed to insert default domain: %w", err)
	}

	return nil
}

func (s *DomainService) GetDefaultDomain() (string, error) {
	if s.db == nil {
		return "", fmt.Errorf("database not initialized")
	}

	var domain string
	err := s.db.QueryRow("SELECT name FROM domains WHERE is_default = TRUE LIMIT 1").Scan(&domain)
	if err == sql.ErrNoRows {
		return "giteria.com", nil
	}
	if err != nil {
		return "", err
	}
	return domain, nil
}
