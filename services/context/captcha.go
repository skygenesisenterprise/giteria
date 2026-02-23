// Copyright 2020 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package context

import (
	"fmt"
	"sync"

	"github.com/skygenesisenterprise/giteria/modules/cache"
	"github.com/skygenesisenterprise/giteria/modules/hcaptcha"
	"github.com/skygenesisenterprise/giteria/modules/log"
	"github.com/skygenesisenterprise/giteria/modules/mcaptcha"
	"github.com/skygenesisenterprise/giteria/modules/recaptcha"
	"github.com/skygenesisenterprise/giteria/modules/setting"
	"github.com/skygenesisenterprise/giteria/modules/templates"
	"github.com/skygenesisenterprise/giteria/modules/turnstile"

	"gitea.com/go-chi/captcha"
)

var (
	imageCaptchaOnce sync.Once
	cpt              *captcha.Captcha
)

// GetImageCaptcha returns global image captcha
func GetImageCaptcha() *captcha.Captcha {
	imageCaptchaOnce.Do(func() {
		cpt = captcha.NewCaptcha(captcha.Options{
			SubURL: setting.AppSubURL,
		})
		cpt.Store = cache.GetCache().ChiCache()
	})
	return cpt
}

// SetCaptchaData sets common captcha data
func SetCaptchaData(ctx *Context) {
	if !setting.Service.EnableCaptcha {
		return
	}
	ctx.Data["EnableCaptcha"] = setting.Service.EnableCaptcha
	ctx.Data["RecaptchaURL"] = setting.Service.RecaptchaURL
	ctx.Data["Captcha"] = GetImageCaptcha()
	ctx.Data["CaptchaType"] = setting.Service.CaptchaType
	ctx.Data["RecaptchaSitekey"] = setting.Service.RecaptchaSitekey
	ctx.Data["HcaptchaSitekey"] = setting.Service.HcaptchaSitekey
	ctx.Data["McaptchaSitekey"] = setting.Service.McaptchaSitekey
	ctx.Data["McaptchaURL"] = setting.Service.McaptchaURL
	ctx.Data["CfTurnstileSitekey"] = setting.Service.CfTurnstileSitekey
}

const (
	gRecaptchaResponseField  = "g-recaptcha-response"
	hCaptchaResponseField    = "h-captcha-response"
	mCaptchaResponseField    = "m-captcha-response"
	cfTurnstileResponseField = "cf-turnstile-response"
)

// VerifyCaptcha verifies Captcha data
// No-op if captchas are not enabled
func VerifyCaptcha(ctx *Context, tpl templates.TplName, form any) {
	if !setting.Service.EnableCaptcha {
		return
	}

	var valid bool
	var err error
	switch setting.Service.CaptchaType {
	case setting.ImageCaptcha:
		valid = GetImageCaptcha().VerifyReq(ctx.Req)
	case setting.ReCaptcha:
		valid, err = recaptcha.Verify(ctx, ctx.Req.Form.Get(gRecaptchaResponseField))
	case setting.HCaptcha:
		valid, err = hcaptcha.Verify(ctx, ctx.Req.Form.Get(hCaptchaResponseField))
	case setting.MCaptcha:
		valid, err = mcaptcha.Verify(ctx, ctx.Req.Form.Get(mCaptchaResponseField))
	case setting.CfTurnstile:
		valid, err = turnstile.Verify(ctx, ctx.Req.Form.Get(cfTurnstileResponseField))
	default:
		ctx.ServerError("Unknown Captcha Type", fmt.Errorf("unknown Captcha Type: %s", setting.Service.CaptchaType))
		return
	}
	if err != nil {
		log.Debug("Captcha Verify failed: %v", err)
	}

	if !valid {
		ctx.Data["Err_Captcha"] = true
		ctx.RenderWithErr(ctx.Tr("form.captcha_incorrect"), tpl, form)
	}
}
