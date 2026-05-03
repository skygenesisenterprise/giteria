// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package issues_test

import (
	"testing"

	issues_model "github.com/skygenesisenterprise/giteria/modules/issues"
	"github.com/skygenesisenterprise/giteria/modules/unittest"

	_ "github.com/skygenesisenterprise/giteria/models"
	_ "github.com/skygenesisenterprise/giteria/modules/actions"
	_ "github.com/skygenesisenterprise/giteria/modules/activities"
	_ "github.com/skygenesisenterprise/giteria/modules/repo"
	_ "github.com/skygenesisenterprise/giteria/modules/user"

	"github.com/stretchr/testify/assert"
)

func TestFixturesAreConsistent(t *testing.T) {
	assert.NoError(t, unittest.PrepareTestDatabase())
	unittest.CheckConsistencyFor(t,
		&issues_model.Issue{},
		&issues_model.PullRequest{},
		&issues_model.Milestone{},
		&issues_model.Label{},
	)
}

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}
