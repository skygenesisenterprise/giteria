// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package activities_test

import (
	"testing"

	"code.gitea.io/gitea/modules/unittest"

	_ "github.com/skygenesisenterprise/giteria/models"
	_ "code.gitea.io/gitea/modules/actions"
)

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}
