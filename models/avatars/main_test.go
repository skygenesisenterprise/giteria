// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package avatars_test

import (
	"testing"

	"github.com/skygenesisenterprise/giteria/modules/unittest"

	_ "github.com/skygenesisenterprise/giteria/models"
	_ "github.com/skygenesisenterprise/giteria/modules/activities"
	_ "github.com/skygenesisenterprise/giteria/modules/perm/access"
)

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}
