// Copyright 2025 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package gitrepo

import (
	"context"

	"github.com/skygenesisenterprise/giteria/modules/git"
)

func WriteCommitGraph(ctx context.Context, repo Repository) error {
	return git.WriteCommitGraph(ctx, repoPath(repo))
}
