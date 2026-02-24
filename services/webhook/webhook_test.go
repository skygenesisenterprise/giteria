// Copyright 2019 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package webhook

import (
	"testing"

	repo_model "github.com/skygenesisenterprise/giteria/models/repo"
	"github.com/skygenesisenterprise/giteria/models/unittest"
	user_model "github.com/skygenesisenterprise/giteria/models/user"
	webhook_model "github.com/skygenesisenterprise/giteria/models/webhook"
	"github.com/skygenesisenterprise/giteria/modules/git"
	"github.com/skygenesisenterprise/giteria/modules/setting"
	api "github.com/skygenesisenterprise/giteria/modules/structs"
	"github.com/skygenesisenterprise/giteria/modules/test"
	webhook_module "github.com/skygenesisenterprise/giteria/modules/webhook"
	"github.com/skygenesisenterprise/giteria/services/convert"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestWebhook_GetSlackHook(t *testing.T) {
	w := &webhook_model.Webhook{
		Meta: `{"channel": "foo", "username": "username", "color": "blue"}`,
	}
	slackHook := GetSlackHook(w)
	assert.Equal(t, SlackMeta{
		Channel:  "foo",
		Username: "username",
		Color:    "blue",
	}, *slackHook)
}

func TestPrepareWebhooks(t *testing.T) {
	assert.NoError(t, unittest.PrepareTestDatabase())

	repo := unittest.AssertExistsAndLoadBean(t, &repo_model.Repository{ID: 1})
	hookTasks := []*webhook_model.HookTask{
		{HookID: 1, EventType: webhook_module.HookEventPush},
	}
	for _, hookTask := range hookTasks {
		unittest.AssertNotExistsBean(t, hookTask)
	}
	assert.NoError(t, PrepareWebhooks(t.Context(), EventSource{Repository: repo}, webhook_module.HookEventPush, &api.PushPayload{Commits: []*api.PayloadCommit{{}}}))
	for _, hookTask := range hookTasks {
		unittest.AssertExistsAndLoadBean(t, hookTask)
	}
}

func TestPrepareWebhooksBranchFilterMatch(t *testing.T) {
	assert.NoError(t, unittest.PrepareTestDatabase())

	repo := unittest.AssertExistsAndLoadBean(t, &repo_model.Repository{ID: 2})
	hookTasks := []*webhook_model.HookTask{
		{HookID: 4, EventType: webhook_module.HookEventPush},
	}
	for _, hookTask := range hookTasks {
		unittest.AssertNotExistsBean(t, hookTask)
	}
	// this test also ensures that * doesn't handle / in any special way (like shell would)
	assert.NoError(t, PrepareWebhooks(t.Context(), EventSource{Repository: repo}, webhook_module.HookEventPush, &api.PushPayload{Ref: "refs/heads/feature/7791", Commits: []*api.PayloadCommit{{}}}))
	for _, hookTask := range hookTasks {
		unittest.AssertExistsAndLoadBean(t, hookTask)
	}
}

func TestPrepareWebhooksBranchFilterNoMatch(t *testing.T) {
	assert.NoError(t, unittest.PrepareTestDatabase())

	repo := unittest.AssertExistsAndLoadBean(t, &repo_model.Repository{ID: 2})
	hookTasks := []*webhook_model.HookTask{
		{HookID: 4, EventType: webhook_module.HookEventPush},
	}
	for _, hookTask := range hookTasks {
		unittest.AssertNotExistsBean(t, hookTask)
	}
	assert.NoError(t, PrepareWebhooks(t.Context(), EventSource{Repository: repo}, webhook_module.HookEventPush, &api.PushPayload{Ref: "refs/heads/fix_weird_bug"}))

	for _, hookTask := range hookTasks {
		unittest.AssertNotExistsBean(t, hookTask)
	}
}

func TestWebhookUserMail(t *testing.T) {
	require.NoError(t, unittest.PrepareTestDatabase())
	defer test.MockVariableValue(&setting.Service.NoReplyAddress, "no-reply.com")()

	user := unittest.AssertExistsAndLoadBean(t, &user_model.User{ID: 1})
	assert.Equal(t, user.GetPlaceholderEmail(), convert.ToUser(t.Context(), user, nil).Email)
	assert.Equal(t, user.Email, convert.ToUser(t.Context(), user, user).Email)
}

func TestCheckBranchFilter(t *testing.T) {
	cases := []struct {
		filter string
		ref    git.RefName
		match  bool
	}{
		{"", "any-ref", true},
		{"*", "any-ref", true},
		{"**", "any-ref", true},

		{"main", git.RefNameFromBranch("main"), true},
		{"main", git.RefNameFromTag("main"), false},

		{"feature/*", git.RefNameFromBranch("feature"), false},
		{"feature/*", git.RefNameFromBranch("feature/foo"), true},
		{"feature/*", git.RefNameFromTag("feature/foo"), false},

		{"{refs/heads/feature/*,refs/tags/release/*}", git.RefNameFromBranch("feature/foo"), true},
		{"{refs/heads/feature/*,refs/tags/release/*}", git.RefNameFromBranch("main"), false},
		{"{refs/heads/feature/*,refs/tags/release/*}", git.RefNameFromTag("release/bar"), true},
		{"{refs/heads/feature/*,refs/tags/release/*}", git.RefNameFromTag("dev"), false},
	}
	for _, v := range cases {
		assert.Equal(t, v.match, checkBranchFilter(v.filter, v.ref), "filter: %q ref: %q", v.filter, v.ref)
	}
}
