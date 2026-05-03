// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package repo_test

import (
	"testing"

	"github.com/skygenesisenterprise/giteria/modules/unittest"

	_ "github.com/skygenesisenterprise/giteria/models" // register table model
	_ "github.com/skygenesisenterprise/giteria/modules/actions"
	_ "github.com/skygenesisenterprise/giteria/modules/activities"
	_ "github.com/skygenesisenterprise/giteria/modules/perm/access" // register table model
	_ "github.com/skygenesisenterprise/giteria/modules/repo"        // register table model
	_ "github.com/skygenesisenterprise/giteria/modules/user"        // register table model
)

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}
