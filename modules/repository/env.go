// Copyright 2019 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package repository

import (
	"os"
	"strconv"
	"strings"

	repo_model "github.com/skygenesisenterprise/giteria/models/repo"
	user_model "github.com/skygenesisenterprise/giteria/models/user"
	"github.com/skygenesisenterprise/giteria/modules/setting"
)

// env keys for git hooks need
const (
	EnvRepoName     = "GITERIA_REPO_NAME"
	EnvRepoUsername = "GITERIA_REPO_USER_NAME"
	EnvRepoID       = "GITERIA_REPO_ID"
	EnvRepoIsWiki   = "GITERIA_REPO_IS_WIKI"
	EnvPusherName   = "GITERIA_PUSHER_NAME"
	EnvPusherEmail  = "GITERIA_PUSHER_EMAIL"
	EnvPusherID     = "GITERIA_PUSHER_ID"
	EnvKeyID        = "GITERIA_KEY_ID" // public key ID
	EnvDeployKeyID  = "GITERIA_DEPLOY_KEY_ID"
	EnvPRID         = "GITERIA_PR_ID"
	EnvPRIndex      = "GITERIA_PR_INDEX" // not used by Gitea at the moment, it is for custom git hooks
	EnvPushTrigger  = "GITERIA_PUSH_TRIGGER"
	EnvIsInternal   = "GITERIA_INTERNAL_PUSH"
	EnvAppURL       = "GITERIA_ROOT_URL"
	EnvActionPerm   = "GITERIA_ACTION_PERM"
)

type PushTrigger string

const (
	PushTriggerPRMergeToBase    PushTrigger = "pr-merge-to-base"
	PushTriggerPRUpdateWithBase PushTrigger = "pr-update-with-base"
)

// InternalPushingEnvironment returns an os environment to switch off hooks on push
// It is recommended to avoid using this unless you are pushing within a transaction
// or if you absolutely are sure that post-receive and pre-receive will do nothing
// We provide the full pushing-environment for other hook providers
func InternalPushingEnvironment(doer *user_model.User, repo *repo_model.Repository) []string {
	return append(PushingEnvironment(doer, repo),
		EnvIsInternal+"=true",
	)
}

// PushingEnvironment returns an os environment to allow hooks to work on push
func PushingEnvironment(doer *user_model.User, repo *repo_model.Repository) []string {
	return FullPushingEnvironment(doer, doer, repo, repo.Name, 0, 0)
}

// FullPushingEnvironment returns an os environment to allow hooks to work on push
func FullPushingEnvironment(author, committer *user_model.User, repo *repo_model.Repository, repoName string, prID, prIndex int64) []string {
	isWiki := "false"
	if strings.HasSuffix(repoName, ".wiki") {
		isWiki = "true"
	}

	authorSig := author.NewGitSig()
	committerSig := committer.NewGitSig()

	environ := append(os.Environ(),
		"GIT_AUTHOR_NAME="+authorSig.Name,
		"GIT_AUTHOR_EMAIL="+authorSig.Email,
		"GIT_COMMITTER_NAME="+committerSig.Name,
		"GIT_COMMITTER_EMAIL="+committerSig.Email,
		EnvRepoName+"="+repoName,
		EnvRepoUsername+"="+repo.OwnerName,
		EnvRepoIsWiki+"="+isWiki,
		EnvPusherName+"="+committer.Name,
		EnvPusherID+"="+strconv.FormatInt(committer.ID, 10),
		EnvRepoID+"="+strconv.FormatInt(repo.ID, 10),
		EnvPRID+"="+strconv.FormatInt(prID, 10),
		EnvPRIndex+"="+strconv.FormatInt(prIndex, 10),
		EnvAppURL+"="+setting.AppURL,
		"SSH_ORIGINAL_COMMAND=gitea-internal",
	)

	if !committer.KeepEmailPrivate {
		environ = append(environ, EnvPusherEmail+"="+committer.Email)
	}

	return environ
}
