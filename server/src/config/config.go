package config

import (
	"os"
	"time"
)

type Config struct {
	Port        string
	DatabaseURL string
	JWTSecret   string
	SystemKey   string
	Mode        string
}

func LoadConfig() *Config {
	return &Config{
		Port:        getEnv("SERVER_PORT", "3000"),
		DatabaseURL: getEnv("DATABASE_URL", ""),
		JWTSecret:   getEnv("JWT_SECRET", generateSecret(32)),
		SystemKey:   getEnv("SYSTEM_KEY", ""),
		Mode:        getEnv("GIN_MODE", "debug"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func generateSecret(length int) string {
	return time.Now().Format("20060102150405") + "default_secret_key"
}
