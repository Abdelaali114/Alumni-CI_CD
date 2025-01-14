# Create docker volumes for data persistance
docker volume create ops_gogs      
docker volume create ops_registry
docker volume create ops_jenkins
docker volume create ops_prometheus
docker volume create ops_grafana
docker volume create app_db_staging
docker volume create prod_db_prod