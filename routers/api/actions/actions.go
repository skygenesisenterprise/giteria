// Copyright 2022 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package actions

import (
	"net/http"

	"github.com/skygenesisenterprise/giteria/modules/web"
	"github.com/skygenesisenterprise/giteria/routers/api/actions/ping"
	"github.com/skygenesisenterprise/giteria/routers/api/actions/runner"
)

func Routes(prefix string) *web.Router {
	m := web.NewRouter()

	path, handler := ping.NewPingServiceHandler()
	m.Post(path+"*", http.StripPrefix(prefix, handler).ServeHTTP)

	path, handler = runner.NewRunnerServiceHandler()
	m.Post(path+"*", http.StripPrefix(prefix, handler).ServeHTTP)

	return m
}
