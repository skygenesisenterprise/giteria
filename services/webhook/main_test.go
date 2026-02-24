// Copyright 2019 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package webhook

import (
	"testing"

	"github.com/skygenesisenterprise/giteria/models/unittest"
	"github.com/skygenesisenterprise/giteria/modules/hostmatcher"
	"github.com/skygenesisenterprise/giteria/modules/setting"

	_ "github.com/skygenesisenterprise/giteria/models"
	_ "github.com/skygenesisenterprise/giteria/models/actions"
)

func TestMain(m *testing.M) {
	// for tests, allow only loopback IPs
	setting.Webhook.AllowedHostList = hostmatcher.MatchBuiltinLoopback
	unittest.MainTest(m, &unittest.TestOptions{
		SetUp: func() error {
			setting.LoadQueueSettings()
			return Init()
		},
	})
}
