// Copyright 2021 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package org

import (
	"testing"

	"github.com/skygenesisenterprise/giteria/models/organization"
	repo_model "github.com/skygenesisenterprise/giteria/models/repo"
	"github.com/skygenesisenterprise/giteria/models/unittest"
	user_model "github.com/skygenesisenterprise/giteria/models/user"

	"github.com/stretchr/testify/assert"
)

func TestMain(m *testing.M) {
	unittest.MainTest(m)
}

func TestDeleteOrganization(t *testing.T) {
	assert.NoError(t, unittest.PrepareTestDatabase())
	org := unittest.AssertExistsAndLoadBean(t, &organization.Organization{ID: 6})
	assert.NoError(t, DeleteOrganization(t.Context(), org, false))
	unittest.AssertNotExistsBean(t, &organization.Organization{ID: 6})
	unittest.AssertNotExistsBean(t, &organization.OrgUser{OrgID: 6})
	unittest.AssertNotExistsBean(t, &organization.Team{OrgID: 6})

	org = unittest.AssertExistsAndLoadBean(t, &organization.Organization{ID: 3})
	err := DeleteOrganization(t.Context(), org, false)
	assert.Error(t, err)
	assert.True(t, repo_model.IsErrUserOwnRepos(err))

	user := unittest.AssertExistsAndLoadBean(t, &organization.Organization{ID: 5})
	assert.Error(t, DeleteOrganization(t.Context(), user, false))
	unittest.CheckConsistencyFor(t, &user_model.User{}, &organization.Team{})
}
