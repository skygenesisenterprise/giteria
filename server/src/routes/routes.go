package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/skygenesisenterprise/giteria/server/src/interfaces"
	"github.com/skygenesisenterprise/giteria/server/src/services"
)

func SetupRoutes(router *gin.Engine, systemKey string, serviceKeyService *services.ServiceKeyService, dbService interfaces.IDatabaseService) {
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	apiV1 := router.Group("/api/v1")
	{
		setupUserRoutes(apiV1, dbService)
		setupRepoRoutes(apiV1, dbService)
		setupOrgRoutes(apiV1, dbService)
		setupMiscRoutes(apiV1)
	}

	if systemKey != "" {
		adminGroup := router.Group("/admin")
		adminGroup.Use(func(c *gin.Context) {
			c.Next()
		})
		setupAdminRoutes(adminGroup, dbService, serviceKeyService)
	}

	oauthGroup := router.Group("/oauth")
	{
		setupOAuthRoutes(oauthGroup)
	}
}

func setupUserRoutes(group *gin.RouterGroup, dbService interfaces.IDatabaseService) {
	users := group.Group("/users")
	{
		users.GET("", listUsers)
		users.GET("/:username", getUser)
		users.POST("", createUser)
		users.PUT("/:username", updateUser)
		users.DELETE("/:username", deleteUser)
	}
}

func setupRepoRoutes(group *gin.RouterGroup, dbService interfaces.IDatabaseService) {
	repos := group.Group("/repos")
	{
		repos.GET("", listRepos)
		repos.GET("/:owner/:name", getRepo)
		repos.POST("", createRepo)
		repos.PUT("/:owner/:name", updateRepo)
		repos.DELETE("/:owner/:name", deleteRepo)
		repos.GET("/:owner/:name/commits", getCommits)
		repos.GET("/:owner/:name/branches", listBranches)
		repos.GET("/:owner/:name/tags", listTags)
		repos.POST("/:owner/:name/fork", forkRepo)
		repos.POST("/:owner/:name/mirror", mirrorRepo)
	}
}

func setupOrgRoutes(group *gin.RouterGroup, dbService interfaces.IDatabaseService) {
	orgs := group.Group("/orgs")
	{
		orgs.GET("", listOrgs)
		orgs.GET("/:name", getOrg)
		orgs.POST("", createOrg)
		orgs.PUT("/:name", updateOrg)
		orgs.DELETE("/:name", deleteOrg)
		orgs.GET("/:name/members", listOrgMembers)
		orgs.GET("/:name/teams", listOrgTeams)
	}
}

func setupMiscRoutes(group *gin.RouterGroup) {
	misc := group.Group("/misc")
	{
		misc.GET("/version", getVersion)
		misc.GET("/health", getHealth)
		misc.GET("/nodeinfo", getNodeInfo)
	}
}

func setupAdminRoutes(group *gin.RouterGroup, dbService interfaces.IDatabaseService, serviceKeyService *services.ServiceKeyService) {
	admin := group.Group("/admin")
	{
		admin.GET("/keys/generate", generateServiceKey(serviceKeyService))
		admin.POST("/keys/validate", validateServiceKey(serviceKeyService))
		admin.GET("/config", getConfig)
		admin.POST("/config", updateConfig)
	}
}

func setupOAuthRoutes(group *gin.RouterGroup) {
	oauth := group.Group("")
	{
		oauth.GET("/authorize", oauthAuthorize)
		oauth.POST("/token", oauthToken)
		oauth.POST("/revoke", oauthRevoke)
	}
}

func listUsers(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"users": []interface{}{}})
}

func getUser(c *gin.Context) {
	username := c.Param("username")
	c.JSON(http.StatusOK, gin.H{"username": username})
}

func createUser(c *gin.Context) {
	c.JSON(http.StatusCreated, gin.H{"message": "user created"})
}

func updateUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "user updated"})
}

func deleteUser(c *gin.Context) {
	c.JSON(http.StatusNoContent, gin.H{})
}

func listRepos(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"repos": []interface{}{}})
}

func getRepo(c *gin.Context) {
	owner := c.Param("owner")
	name := c.Param("name")
	c.JSON(http.StatusOK, gin.H{"owner": owner, "name": name})
}

func createRepo(c *gin.Context) {
	c.JSON(http.StatusCreated, gin.H{"message": "repo created"})
}

func updateRepo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "repo updated"})
}

func deleteRepo(c *gin.Context) {
	c.JSON(http.StatusNoContent, gin.H{})
}

func getCommits(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"commits": []interface{}{}})
}

func listBranches(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"branches": []interface{}{}})
}

func listTags(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"tags": []interface{}{}})
}

func forkRepo(c *gin.Context) {
	c.JSON(http.StatusCreated, gin.H{"message": "repo forked"})
}

func mirrorRepo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "mirror configured"})
}

func listOrgs(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"orgs": []interface{}{}})
}

func getOrg(c *gin.Context) {
	name := c.Param("name")
	c.JSON(http.StatusOK, gin.H{"name": name})
}

func createOrg(c *gin.Context) {
	c.JSON(http.StatusCreated, gin.H{"message": "org created"})
}

func updateOrg(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "org updated"})
}

func deleteOrg(c *gin.Context) {
	c.JSON(http.StatusNoContent, gin.H{})
}

func listOrgMembers(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"members": []interface{}{}})
}

func listOrgTeams(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"teams": []interface{}{}})
}

func getVersion(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"version": "1.0.0", "giteria": "giteria.com"})
}

func getHealth(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "healthy"})
}

func getNodeInfo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"version": "2.0",
		"software": gin.H{
			"name":    "giteria",
			"version": "1.0.0",
		},
		"protocols":         []string{"activitypub"},
		"services":          gin.H{"inbound": []string{}, "outbound": []string{}},
		"openRegistrations": true,
		"usage": gin.H{
			"users":         gin.H{"total": 0},
			"localPosts":    0,
			"localComments": 0,
		},
	})
}

func generateServiceKey(sks *services.ServiceKeyService) gin.HandlerFunc {
	return func(c *gin.Context) {
		if sks == nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "service not available"})
			return
		}
		key, err := sks.GenerateSystemKey()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"key": key})
	}
}

func validateServiceKey(sks *services.ServiceKeyService) gin.HandlerFunc {
	return func(c *gin.Context) {
		key := c.PostForm("key")
		if key == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "key required"})
			return
		}
		valid, err := sks.ValidateSystemKey(key)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"valid": valid})
	}
}

func getConfig(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"config": "config endpoint"})
}

func updateConfig(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "config updated"})
}

func oauthAuthorize(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"oauth": "authorize"})
}

func oauthToken(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"access_token": "token"})
}

func oauthRevoke(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "revoked"})
}
