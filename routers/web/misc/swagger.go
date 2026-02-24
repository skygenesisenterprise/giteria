// Copyright 2017 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package misc

import (
	"net/http"

	"github.com/skygenesisenterprise/giteria/modules/templates"
	"github.com/skygenesisenterprise/giteria/services/context"
)

// tplSwagger swagger page template
const tplSwagger templates.TplName = "swagger/ui"

// Swagger render swagger-ui page with v1 json
func Swagger(ctx *context.Context) {
	ctx.Data["APIJSONVersion"] = "v1"
	ctx.HTML(http.StatusOK, tplSwagger)
}
