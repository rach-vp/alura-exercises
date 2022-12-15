#!/bin/bash

kubectl config use-context docker-desktop
kubectl delete -f ./services/news-db-svc.yaml
kubectl delete -f ./pods/news-db.yaml
kubectl delete -f ./services/news-portal-svc.yaml
kubectl delete -f ./pods/news-portal.yaml
kubectl delete -f ./services/news-system-svc.yaml
kubectl delete -f ./pods/news-system.yaml
kubectl delete -f ./configMaps/news-db-configmap.yaml
kubectl delete -f ./configMaps/news-system-configmap.yaml
kubectl delete -f ./configMaps/news-portal-configmap.yaml
kubectl delete -f ./deployments/news-db-deployment.yaml
kubectl delete -f ./deployments/news-system-deployment.yaml
kubectl delete -f ./deployments/news-portal-deployment.yaml