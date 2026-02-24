// Copyright 2024 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package common

import (
	repo_model "github.com/skygenesisenterprise/giteria/models/repo"
	user_model "github.com/skygenesisenterprise/giteria/models/user"
	"github.com/skygenesisenterprise/giteria/modules/git"
	pull_service "github.com/skygenesisenterprise/giteria/services/pull"
)

// CompareInfo represents the collected results from ParseCompareInfo
type CompareInfo struct {
	HeadUser         *user_model.User
	HeadRepo         *repo_model.Repository
	HeadGitRepo      *git.Repository
	CompareInfo      *pull_service.CompareInfo
	BaseBranch       string
	HeadBranch       string
	DirectComparison bool
}
