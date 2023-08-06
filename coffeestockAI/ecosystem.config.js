module.exports = {
    "apps": [
        {
            "name": "flask server",
            "script": "gunicorn --workers=4 -b 0.0.0.0:5000 --worker-class=meinheld.gmeinheld.MeinheldWorker api.app:app",
            "watch": false,
            "max_memory_restart": "256M",
            "output": "/var/www/html/logs/my-app-out.log",
            "error": "/var/www/html/logs/my-app-error.log",
            "kill_timeout": 5000,
            "restartDelay": 5000
        }
    ]
}