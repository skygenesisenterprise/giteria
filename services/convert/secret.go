// Copyright 2023 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package convert

import (
	secret_model "github.com/skygenesisenterprise/giteria/models/secret"
	api "github.com/skygenesisenterprise/giteria/modules/structs"
)

// ToSecret converts Secret to API format
func ToSecret(secret *secret_model.Secret) *api.Secret {
	result := &api.Secret{
		Name: secret.Name,
	}

	return result
}
