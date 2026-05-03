// Copyright 2021 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package repo_test

import (
	"testing"
	"time"

	"github.com/skygenesisenterprise/giteria/modules/db"
	repo_model "github.com/skygenesisenterprise/giteria/modules/repo"
	"github.com/skygenesisenterprise/giteria/modules/unittest"
	"github.com/skygenesisenterprise/giteria/modules/timeutil"

	"github.com/stretchr/testify/assert"
)

func TestPushMirrorsIterate(t *testing.T) {
	assert.NoError(t, unittest.PrepareTestDatabase())

	now := timeutil.TimeStampNow()

	db.Insert(t.Context(), &repo_model.PushMirror{
		RemoteName:     "test-1",
		LastUpdateUnix: now,
		Interval:       1,
	})

	long, _ := time.ParseDuration("24h")
	db.Insert(t.Context(), &repo_model.PushMirror{
		RemoteName:     "test-2",
		LastUpdateUnix: now,
		Interval:       long,
	})

	db.Insert(t.Context(), &repo_model.PushMirror{
		RemoteName:     "test-3",
		LastUpdateUnix: now,
		Interval:       0,
	})

	repo_model.PushMirrorsIterate(t.Context(), 1, func(idx int, bean any) error {
		m, ok := bean.(*repo_model.PushMirror)
		assert.True(t, ok)
		assert.Equal(t, "test-1", m.RemoteName)
		assert.Equal(t, m.RemoteName, m.GetRemoteName())
		return nil
	})
}
