// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package repo_test

import (
	"testing"

	"code.gitea.io/gitea/modules/unittest"

	_ "github.com/skygenesisenterprise/giteria/models" // register table model
	_ "code.gitea.io/gitea/modules/actions"
	_ "code.gitea.io/gitea/modules/activities"
	_ "code.gitea.io/gitea/modules/perm/access" // register table model
	_ "code.gitea.io/gitea/modules/repo"        // register table model
	_ "code.gitea.io/gitea/modules/user"        // register table model
)

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}
