// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package doctor

import (
	"context"

	"github.com/skygenesisenterprise/giteria/models/db"
	"github.com/skygenesisenterprise/giteria/models/migrations"
	"github.com/skygenesisenterprise/giteria/modules/log"
	"github.com/skygenesisenterprise/giteria/services/versioned_migration"
)

func checkDBVersion(ctx context.Context, logger log.Logger, autofix bool) error {
	logger.Info("Expected database version: %d", migrations.ExpectedDBVersion())
	if err := db.InitEngineWithMigration(ctx, migrations.EnsureUpToDate); err != nil {
		if !autofix {
			logger.Critical("Error: %v during ensure up to date", err)
			return err
		}
		logger.Warn("Got Error: %v during ensure up to date", err)
		logger.Warn("Attempting to migrate to the latest DB version to fix this.")

		err = db.InitEngineWithMigration(ctx, versioned_migration.Migrate)
		if err != nil {
			logger.Critical("Error: %v during migration", err)
		}
		return err
	}
	return nil
}

func init() {
	Register(&Check{
		Title:         "Check Database Version",
		Name:          "check-db-version",
		IsDefault:     true,
		Run:           checkDBVersion,
		AbortIfFailed: false,
		Priority:      2,
	})
}
