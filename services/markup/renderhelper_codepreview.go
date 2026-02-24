// Copyright 2024 The Gitea Authors. All rights reserved.
// SPDX-License-Identifier: MIT

package markup

import (
	"bufio"
	"context"
	"errors"
	"html/template"
	"strings"

	"github.com/skygenesisenterprise/giteria/models/perm/access"
	"github.com/skygenesisenterprise/giteria/models/repo"
	"github.com/skygenesisenterprise/giteria/models/unit"
	"github.com/skygenesisenterprise/giteria/modules/charset"
	"github.com/skygenesisenterprise/giteria/modules/git/languagestats"
	"github.com/skygenesisenterprise/giteria/modules/gitrepo"
	"github.com/skygenesisenterprise/giteria/modules/indexer/code"
	"github.com/skygenesisenterprise/giteria/modules/markup"
	"github.com/skygenesisenterprise/giteria/modules/setting"
	"github.com/skygenesisenterprise/giteria/modules/util"
	gitea_context "github.com/skygenesisenterprise/giteria/services/context"
)

func renderRepoFileCodePreview(ctx context.Context, opts markup.RenderCodePreviewOptions) (template.HTML, error) {
	opts.LineStop = max(opts.LineStop, opts.LineStart)
	lineCount := opts.LineStop - opts.LineStart + 1
	if lineCount <= 0 || lineCount > 140 /* GitHub at most show 140 lines */ {
		lineCount = 10
		opts.LineStop = opts.LineStart + lineCount
	}

	dbRepo, err := repo.GetRepositoryByOwnerAndName(ctx, opts.OwnerName, opts.RepoName)
	if err != nil {
		return "", err
	}

	webCtx := gitea_context.GetWebContext(ctx)
	if webCtx == nil {
		return "", errors.New("context is not a web context")
	}
	doer := webCtx.Doer

	perms, err := access.GetUserRepoPermission(ctx, dbRepo, doer)
	if err != nil {
		return "", err
	}
	if !perms.CanRead(unit.TypeCode) {
		return "", util.ErrPermissionDenied
	}

	gitRepo, err := gitrepo.OpenRepository(ctx, dbRepo)
	if err != nil {
		return "", err
	}
	defer gitRepo.Close()

	commit, err := gitRepo.GetCommit(opts.CommitID)
	if err != nil {
		return "", err
	}

	language, _ := languagestats.GetFileLanguage(ctx, gitRepo, opts.CommitID, opts.FilePath)
	blob, err := commit.GetBlobByPath(opts.FilePath)
	if err != nil {
		return "", err
	}

	if blob.Size() > setting.UI.MaxDisplayFileSize {
		return "", errors.New("file is too large")
	}

	dataRc, err := blob.DataAsync()
	if err != nil {
		return "", err
	}
	defer dataRc.Close()

	reader := bufio.NewReader(dataRc)
	for i := 1; i < opts.LineStart; i++ {
		if _, err = reader.ReadBytes('\n'); err != nil {
			return "", err
		}
	}

	lineNums := make([]int, 0, lineCount)
	lineCodes := make([]string, 0, lineCount)
	for i := opts.LineStart; i <= opts.LineStop; i++ {
		line, err := reader.ReadString('\n')
		if err != nil && line == "" {
			break
		}

		lineNums = append(lineNums, i)
		lineCodes = append(lineCodes, line)
	}
	realLineStop := max(opts.LineStart, opts.LineStart+len(lineNums)-1)
	highlightLines := code.HighlightSearchResultCode(opts.FilePath, language, lineNums, strings.Join(lineCodes, ""))

	escapeStatus := &charset.EscapeStatus{}
	lineEscapeStatus := make([]*charset.EscapeStatus, len(highlightLines))
	for i, hl := range highlightLines {
		lineEscapeStatus[i], hl.FormattedContent = charset.EscapeControlHTML(hl.FormattedContent, webCtx.Base.Locale, charset.RuneNBSP)
		escapeStatus = escapeStatus.Or(lineEscapeStatus[i])
	}

	return webCtx.RenderToHTML("base/markup_codepreview", map[string]any{
		"FullURL":          opts.FullURL,
		"FilePath":         opts.FilePath,
		"LineStart":        opts.LineStart,
		"LineStop":         realLineStop,
		"RepoName":         opts.RepoName,
		"RepoLink":         dbRepo.Link(),
		"CommitID":         opts.CommitID,
		"HighlightLines":   highlightLines,
		"EscapeStatus":     escapeStatus,
		"LineEscapeStatus": lineEscapeStatus,
	})
}
