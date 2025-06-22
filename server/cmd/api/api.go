package api

import (
	"fmt"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"future.server/internal/lib"
	"future.server/internal/module/auth"
)

type APIServer struct {
	logger *lib.Logger
	addr   string
	db     *gorm.DB
}

func NewAPIServer(addr string, db *gorm.DB) *APIServer {
	return &APIServer{
		logger: lib.NewLogger(),
		addr:   addr,
		db:     db,
	}
}

func (s *APIServer) Run() error {
	router := mux.NewRouter()
	subrouter := router.PathPrefix("/api/v1").Subrouter()

	// -------------
	// ROUTERS PATHS
	// -------------
	errors := packages.NewErrors()

	// configuration.NewHandler(monitoring, errors).RegisterRoutes(subrouter)

	// ------------------
	// Middlewares
	// ------------------
	router.Use(packages.NewLogger().LoggerMiddleware)

	// ---------------
	// подключаем CORS
	// ---------------
	origins := handlers.AllowedOrigins([]string{"http://localhost:5173"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})
	headers := handlers.AllowedHeaders([]string{"Content-Type", "X-Requested-With", "Authorization"})
	allowCredentials := handlers.AllowCredentials()

	// go vemail.EmailStats(monitoring)

	// --------------------
	// Возращяем http ответ
	// --------------------
	s.logger.Info(fmt.Sprintf("Listening on %s", s.addr))
	return http.ListenAndServe(s.addr, handlers.CORS(origins, methods, headers, allowCredentials)(router))
}
