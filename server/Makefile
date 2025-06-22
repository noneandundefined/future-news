.PHONY: fmt lint test

fmt:
	gofmt -w .
	goimports -w .

lint:
	golangci-lint run

check: fmt lint test
	@echo "All checks passed!"
build:
	@echo "Running build..."
	@go build -o bin/http main.go

test:
	@go test -v ./...

run: build
	@./bin/http

run-to-test:
	@cmd /c "$(CURDIR)/$(BATCH_FILE_TEST)"

migrate-up:
	@echo "Running up migrations..."
	@go run cmd/migrate/main.go up

migrate-down:
	@echo "Running down migrations..."
	@go run cmd/migrate/main.go down
