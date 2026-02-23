// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package auth_test

import (
	"testing"

	"code.gitea.io/gitea/modules/unittest"

	_ "github.com/skygenesisenterprise/giteria/models"
	_ "code.gitea.io/gitea/modules/actions"
	_ "code.gitea.io/gitea/modules/activities"
	_ "code.gitea.io/gitea/modules/auth"
	_ "code.gitea.io/gitea/modules/perm/access"
)

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}
