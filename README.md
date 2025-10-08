# Go React 

**Go React** is a project template for building cross-platform applications that feature a web-based interface. It combines the power of the Go programming language for the backend with a React frontend.

The final output of this template is a standalone executable binary. This single binary acts as a web server, serving both the embedded React frontend and the backend API.

:warning: This template is still a work in progress :construction:

## Stack

#### Backend:
- [gofiber](https://gofiber.io) (API & File Server)
- [gorm](https://gorm.io) (ORM) (with [gorm.io/driver/sqlite](https://gorm.io/docs/connecting_to_the_database.html#SQLite))

#### Frontend:
- [React](https://react.dev) (with [Tanstack Router](https://tanstack.com/router))
- [Tanstack Query](https://tanstack.com/query)
- [shadcn/ui](https://ui.shadcn.com)


## What’s Awesome

* **🔗 Single Binary Deployment**

  Bundle your entire application, frontend and backend, into one executable file. No external dependencies, no separate server or client setup.

* **⚡ Fast and Efficient**

  Built with Go for performance and low resource consumption. Ideal for running on servers, desktops, or embedded systems.

* **🌐 Modern Web UI**

  Use React (with shadcn/ui) to create a dynamic, responsive, and user-friendly interface.

* **🛠️ Cross-Platform Support**

  Compile your app for Windows, macOS, and Linux with minimal changes.

* **🧳 Portable and Offline-Ready**

  Because the UI is embedded and served locally, your app works without an internet connection.

* **📦 Simple Distribution**

  Distribute and run your app as a single file. Great for internal tools, downloadable apps, or developer utilities.

* **🚀 Rapid Development**

  Benefit from fast Go compilation and hot-reloading frontend development with React's powerful tooling.
