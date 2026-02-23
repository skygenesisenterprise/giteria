// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package project

import (
	"testing"

	"code.gitea.io/gitea/modules/unittest"

	_ "code.gitea.io/gitea/modules/repo"
)

func TestMain(m *testing.M) {
	unittest.MainTest(m, &unittest.TestOptions{
		FixtureFiles: []string{
			"project.yml",
			"project_board.yml",
			"project_issue.yml",
			"repository.yml",
		},
	})
}
