// Copyright 2022 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package admin

import (
	"github.com/skygenesisenterprise/giteria/modules/setting"
	"github.com/skygenesisenterprise/giteria/services/context"
)

func RedirectToDefaultSetting(ctx *context.Context) {
	ctx.Redirect(setting.AppSubURL + "/-/admin/actions/runners")
}
