// Copyright 2024 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package org

import (
	"net/http"

	"github.com/skygenesisenterprise/giteria/modules/templates"
	shared_user "github.com/skygenesisenterprise/giteria/routers/web/shared/user"
	"github.com/skygenesisenterprise/giteria/services/context"
)

const (
	tplSettingsBlockedUsers templates.TplName = "org/settings/blocked_users"
)

func BlockedUsers(ctx *context.Context) {
	ctx.Data["Title"] = ctx.Tr("user.block.list")
	ctx.Data["PageIsOrgSettings"] = true
	ctx.Data["PageIsSettingsBlockedUsers"] = true

	if _, err := shared_user.RenderUserOrgHeader(ctx); err != nil {
		ctx.ServerError("RenderUserOrgHeader", err)
		return
	}

	shared_user.BlockedUsers(ctx, ctx.ContextUser)
	if ctx.Written() {
		return
	}

	ctx.HTML(http.StatusOK, tplSettingsBlockedUsers)
}

func BlockedUsersPost(ctx *context.Context) {
	if _, err := shared_user.RenderUserOrgHeader(ctx); err != nil {
		ctx.ServerError("RenderUserOrgHeader", err)
		return
	}

	shared_user.BlockedUsersPost(ctx, ctx.ContextUser)
	if ctx.Written() {
		return
	}

	ctx.Redirect(ctx.ContextUser.OrganisationLink() + "/settings/blocked_users")
}
