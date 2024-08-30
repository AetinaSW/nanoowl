# demokit-genai-ui

## Introduction

This is a demo kit for the GenAI UI. It is a web-based interface that allows users to control the GenAI.

### Hosting

This project will be hosted at `0.0.0.0:7861` by default. You can access it by opening your browser and entering the URL `http://0.0.0.0:7861`.

### Features

- Display the GenAI screen
- Provide a simple operation interface
- Allow users to control the GenAI screen through the web

## Prerequisites

### Software

You need to install the GenAI environment before deploying this project.
- Docker
- Docker Compose

### Hardware

- Aetina Jetson Device
- Monitor
- USB Camera
- Keyboard
- Mouse

## Installing

To deploy this project, follow the steps below:
```bash
./package/docker-run.sh
```

## Settings

You can customize the settings by editing the `settings.js` file:

```bash
vi ./package/settings.js
```

After editing the settings, you need to restart the server to apply the changes:

```bash
./package/docker-restart.sh
```

## Uninstallation

To remove the project, run the following command:

```bash
./package/uninstall.sh
```

## Troubleshooting

### Logs

To view the logs of the running container, use the following command:

```bash
cd package
docker compose logs -f
```

### Restarting the Service

If you need to restart the service for any reason, you can use:

```bash
./package/docker-restart.sh
```

### Stopping the Service

To stop the service without removing the containers, run:

```bash
./package/docker-stop.sh
```

### Update the images

If you need to update the images, you can use:

```bash
./package/docker-update-images.sh
```

## Support

For support, please contact us at [https://www.aetina.com/about-inquiry.php](https://www.aetina.com/about-inquiry.php)

## Legal

This project is licensed under the `TBD` License - see the [LICENSE](LICENSE) file for details.
Copyright © 2024 Aetina Corporation
