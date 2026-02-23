// Copyright 2019 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package repository

import (
	"testing"

	"github.com/skygenesisenterprise/giteria/models/unittest"

	_ "github.com/skygenesisenterprise/giteria/models"
	_ "github.com/skygenesisenterprise/giteria/models/actions"
)

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}
