// Copyright 2025 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package gitrepo

import (
	"context"

	"github.com/skygenesisenterprise/giteria/modules/git"
)

func NewBatch(ctx context.Context, repo Repository) (*git.Batch, error) {
	return git.NewBatch(ctx, repoPath(repo))
}
