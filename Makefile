build: ui-build go-build

build-win: ui-build go-build-win

ui-build:
	cd ui && npm run build

go-build:
	go build

go-build-win:
	GOOS=windows GOARCH=amd64 CGO_ENABLED=1 CC=x86_64-w64-mingw32-gcc go build -o go-react.exe
