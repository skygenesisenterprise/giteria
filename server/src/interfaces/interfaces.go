package interfaces

import "database/sql"

type IDatabaseService interface {
	GetDB() *sql.DB
	Close() error
	Ping() error
}

type IDomainService interface {
	InitializeDefaultDomains() error
	GetDefaultDomain() (string, error)
}

type IServiceKeyService interface {
	ValidateSystemKey(key string) (bool, error)
	GenerateSystemKey() (string, error)
}
