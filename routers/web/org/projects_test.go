// Copyright 2022 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package org_test

import (
	"testing"

	"github.com/skygenesisenterprise/giteria/models/unittest"
	"github.com/skygenesisenterprise/giteria/routers/web/org"
	"github.com/skygenesisenterprise/giteria/services/contexttest"

	"github.com/stretchr/testify/assert"
)

func TestCheckProjectColumnChangePermissions(t *testing.T) {
	unittest.PrepareTestEnv(t)
	ctx, _ := contexttest.MockContext(t, "user2/-/projects/4/4")
	contexttest.LoadUser(t, ctx, 2)
	ctx.ContextUser = ctx.Doer // user2
	ctx.SetPathParam("id", "4")
	ctx.SetPathParam("columnID", "4")

	project, column := org.CheckProjectColumnChangePermissions(ctx)
	assert.NotNil(t, project)
	assert.NotNil(t, column)
	assert.False(t, ctx.Written())
}
