#!/bin/bash

kubectl config use-context docker-desktop

echo '--> Creating DB'
kubectl apply -f ./configMaps/news-db-configmap.yaml
kubectl apply -f ./deployments/news-db-deployment.yaml
kubectl apply -f ./services/news-db-svc.yaml

echo '--> Creating news system'
kubectl apply -f ./configMaps/news-system-configmap.yaml
kubectl apply -f ./deployments/news-system-deployment.yaml
kubectl apply -f ./services/news-system-svc.yaml

echo '--> Creating portal'
kubectl apply -f ./configMaps/news-portal-configmap.yaml
kubectl apply -f ./deployments/news-portal-deployment.yaml
kubectl apply -f ./services/news-portal-svc.yaml
