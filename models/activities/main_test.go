// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package activities_test

import (
	"testing"

	"github.com/skygenesisenterprise/giteria/modules/unittest"

	_ "github.com/skygenesisenterprise/giteria/models"
	_ "github.com/skygenesisenterprise/giteria/modules/actions"
)

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}
