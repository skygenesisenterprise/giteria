// Copyright 2021 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package explore

import (
	"github.com/skygenesisenterprise/giteria/models/db"
	user_model "github.com/skygenesisenterprise/giteria/models/user"
	"github.com/skygenesisenterprise/giteria/modules/container"
	"github.com/skygenesisenterprise/giteria/modules/setting"
	"github.com/skygenesisenterprise/giteria/modules/structs"
	"github.com/skygenesisenterprise/giteria/modules/util"
	"github.com/skygenesisenterprise/giteria/services/context"
)

// Organizations render explore organizations page
func Organizations(ctx *context.Context) {
	if setting.Service.Explore.DisableOrganizationsPage {
		ctx.Redirect(setting.AppSubURL + "/explore")
		return
	}

	ctx.Data["UsersPageIsDisabled"] = setting.Service.Explore.DisableUsersPage
	ctx.Data["CodePageIsDisabled"] = setting.Service.Explore.DisableCodePage
	ctx.Data["Title"] = ctx.Tr("explore")
	ctx.Data["PageIsExplore"] = true
	ctx.Data["PageIsExploreOrganizations"] = true
	ctx.Data["IsRepoIndexerEnabled"] = setting.Indexer.RepoIndexerEnabled

	visibleTypes := []structs.VisibleType{structs.VisibleTypePublic}
	if ctx.Doer != nil {
		visibleTypes = append(visibleTypes, structs.VisibleTypeLimited, structs.VisibleTypePrivate)
	}

	supportedSortOrders := container.SetOf(
		"newest",
		"oldest",
		"alphabetically",
		"reversealphabetically",
	)
	sortOrder := ctx.FormString("sort")
	if sortOrder == "" {
		sortOrder = util.Iif(supportedSortOrders.Contains(setting.UI.ExploreDefaultSort), setting.UI.ExploreDefaultSort, "newest")
		ctx.SetFormString("sort", sortOrder)
	}

	RenderUserSearch(ctx, user_model.SearchUserOptions{
		Actor:       ctx.Doer,
		Types:       []user_model.UserType{user_model.UserTypeOrganization},
		ListOptions: db.ListOptions{PageSize: setting.UI.ExplorePagingNum},
		Visible:     visibleTypes,

		SupportedSortOrders: supportedSortOrders,
	}, tplExploreUsers)
}
