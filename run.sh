sh network-entrypoint.sh && 
(docker-compose -f docker-compose.$1.yml down -v) &&
(docker-compose -f docker-compose.$1.yml up --build -d)