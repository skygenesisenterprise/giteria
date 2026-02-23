// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package models

import (
	"testing"

	activities_model "github.com/skygenesisenterprise/giteria/modules/activities"
	"github.com/skygenesisenterprise/giteria/modules/organization"
	repo_model "github.com/skygenesisenterprise/giteria/modules/repo"
	"github.com/skygenesisenterprise/giteria/modules/unittest"
	user_model "github.com/skygenesisenterprise/giteria/modules/user"

	_ "github.com/skygenesisenterprise/giteria/modules/actions"
	_ "github.com/skygenesisenterprise/giteria/modules/system"

	"github.com/stretchr/testify/assert"
)

// TestFixturesAreConsistent assert that test fixtures are consistent
func TestFixturesAreConsistent(t *testing.T) {
	assert.NoError(t, unittest.PrepareTestDatabase())
	unittest.CheckConsistencyFor(t,
		&user_model.User{},
		&repo_model.Repository{},
		&organization.Team{},
		&activities_model.Action{})
}

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}
