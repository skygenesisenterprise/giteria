// Copyright 2023 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package cmd

import (
	"context"

	"github.com/skygenesisenterprise/giteria/modules/graceful"
	asymkey_service "github.com/skygenesisenterprise/giteria/services/asymkey"
	repo_service "github.com/skygenesisenterprise/giteria/services/repository"

	"github.com/urfave/cli/v3"
)

var (
	microcmdRegenHooks = &cli.Command{
		Name:   "hooks",
		Usage:  "Regenerate git-hooks",
		Action: runRegenerateHooks,
	}

	microcmdRegenKeys = &cli.Command{
		Name:   "keys",
		Usage:  "Regenerate authorized_keys file",
		Action: runRegenerateKeys,
	}
)

func runRegenerateHooks(ctx context.Context, _ *cli.Command) error {
	if err := initDB(ctx); err != nil {
		return err
	}
	return repo_service.SyncRepositoryHooks(graceful.GetManager().ShutdownContext())
}

func runRegenerateKeys(ctx context.Context, _ *cli.Command) error {
	if err := initDB(ctx); err != nil {
		return err
	}
	return asymkey_service.RewriteAllPublicKeys(ctx)
}
