// Copyright 2021 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package private

import (
	"net/http"

	"github.com/skygenesisenterprise/giteria/modules/log"
	"github.com/skygenesisenterprise/giteria/modules/private"
	"github.com/skygenesisenterprise/giteria/modules/setting"
	"github.com/skygenesisenterprise/giteria/modules/web"
	"github.com/skygenesisenterprise/giteria/services/context"
)

// SSHLog hook to response ssh log
func SSHLog(ctx *context.PrivateContext) {
	if !setting.Log.EnableSSHLog {
		ctx.Status(http.StatusOK)
		return
	}

	opts := web.GetForm(ctx).(*private.SSHLogOption)

	if opts.IsError {
		log.Error("ssh: %v", opts.Message)
		ctx.Status(http.StatusOK)
		return
	}

	log.Debug("ssh: %v", opts.Message)
	ctx.Status(http.StatusOK)
}
