// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package system_test

import (
	"testing"

	"github.com/skygenesisenterprise/giteria/modules/unittest"

	_ "github.com/skygenesisenterprise/giteria/models" // register models
	_ "github.com/skygenesisenterprise/giteria/modules/actions"
	_ "github.com/skygenesisenterprise/giteria/modules/activities"
	_ "github.com/skygenesisenterprise/giteria/modules/system" // register models of system
)

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}
