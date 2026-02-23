// Copyright 2025 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package gitrepo

import (
	"context"

	"github.com/skygenesisenterprise/giteria/modules/git"
)

func Push(ctx context.Context, repo Repository, opts git.PushOptions) error {
	return git.Push(ctx, repoPath(repo), opts)
}
