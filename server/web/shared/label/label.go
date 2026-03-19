// Copyright 2025 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package label

import (
	"github.com/skygenesisenterprise/giteria/modules/label"
	"github.com/skygenesisenterprise/giteria/modules/web"
	"github.com/skygenesisenterprise/giteria/services/context"
	"github.com/skygenesisenterprise/giteria/services/forms"
)

func GetLabelEditForm(ctx *context.Context) *forms.CreateLabelForm {
	form := web.GetForm(ctx).(*forms.CreateLabelForm)
	if ctx.HasError() {
		ctx.JSONError(ctx.Data["ErrorMsg"].(string))
		return nil
	}
	var err error
	form.Color, err = label.NormalizeColor(form.Color)
	if err != nil {
		ctx.JSONError(ctx.Tr("repo.issues.label_color_invalid"))
		return nil
	}
	return form
}
