// Copyright 2021 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package private

import (
	"fmt"
	"net/http"

	repo_model "github.com/skygenesisenterprise/giteria/models/repo"
	"github.com/skygenesisenterprise/giteria/modules/gitrepo"
	"github.com/skygenesisenterprise/giteria/modules/private"
	gitea_context "github.com/skygenesisenterprise/giteria/services/context"
	repo_service "github.com/skygenesisenterprise/giteria/services/repository"
)

// SetDefaultBranch updates the default branch
func SetDefaultBranch(ctx *gitea_context.PrivateContext) {
	ownerName := ctx.PathParam("owner")
	repoName := ctx.PathParam("repo")
	branch := ctx.PathParam("branch")

	ctx.Repo.Repository.DefaultBranch = branch
	if err := gitrepo.SetDefaultBranch(ctx, ctx.Repo.Repository, ctx.Repo.Repository.DefaultBranch); err != nil {
		ctx.JSON(http.StatusInternalServerError, private.Response{
			Err: fmt.Sprintf("Unable to set default branch on repository: %s/%s Error: %v", ownerName, repoName, err),
		})
		return
	}

	if err := repo_model.UpdateDefaultBranch(ctx, ctx.Repo.Repository); err != nil {
		ctx.JSON(http.StatusInternalServerError, private.Response{
			Err: fmt.Sprintf("Unable to set default branch on repository: %s/%s Error: %v", ownerName, repoName, err),
		})
		return
	}

	if err := repo_service.AddRepoToLicenseUpdaterQueue(&repo_service.LicenseUpdaterOptions{
		RepoID: ctx.Repo.Repository.ID,
	}); err != nil {
		ctx.JSON(http.StatusInternalServerError, private.Response{
			Err: fmt.Sprintf("Unable to set default branch on repository: %s/%s Error: %v", ownerName, repoName, err),
		})
		return
	}

	ctx.PlainText(http.StatusOK, "success")
}
