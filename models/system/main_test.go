// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package system_test

import (
	"testing"

	"code.gitea.io/gitea/modules/unittest"

	_ "github.com/skygenesisenterprise/giteria/models" // register models
	_ "code.gitea.io/gitea/modules/actions"
	_ "code.gitea.io/gitea/modules/activities"
	_ "code.gitea.io/gitea/modules/system" // register models of system
)

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}
