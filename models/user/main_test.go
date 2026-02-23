// Copyright 2021 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package user_test

import (
	"testing"

	"code.gitea.io/gitea/modules/unittest"

	_ "github.com/skygenesisenterprise/giteria/models"
	_ "code.gitea.io/gitea/modules/actions"
	_ "code.gitea.io/gitea/modules/activities"
	_ "code.gitea.io/gitea/modules/user"
)

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}
