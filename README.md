# **HMS SDK**

## **Background**

## **Installation**

 - [NodeJS]()
 - [Docker]()
 - [Docker Compose]()
 - [NextJS]()
 - [Material-UI]()

## **Usage**

**Development environment**

```bash
# Stop current/previous service in docker compose file "docker-compose.dev.yml"
$ docker-compose -f docker-compose.dev.yml down -v

# Start service in docker compose file "docker-compose.dev.yml"
$ docker-compose -f docker-compose.dev.yml up --build
```

**Production environment**

```bash
# Stop current/previous service in docker compose file "docker-compose.prod.yml"
$ docker-compose -f docker-compose.prod.yml down -v

# Start service in docker compose file "docker-compose.prod.yml"
$ docker-compose -f docker-compose.prod.yml up --build
```

## **Limitation**

## License

MIT License