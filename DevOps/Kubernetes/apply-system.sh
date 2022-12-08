#!/bin/bash

kubectl config use-context docker-desktop

echo '--> Creating DB'
kubectl apply -f ./configMaps/news-db-configmap.yaml
kubectl apply -f ./pods/news-db.yaml
kubectl apply -f ./services/news-db-svc.yaml

echo '--> Creating news system'
kubectl apply -f ./configMaps/news-system-configmap.yaml
kubectl apply -f ./pods/news-system.yaml
kubectl apply -f ./services/news-system-svc.yaml

echo '--> Creating portal'
kubectl apply -f ./configMaps/news-portal-configmap.yaml
kubectl apply -f ./pods/news-portal.yaml
kubectl apply -f ./services/news-portal-svc.yaml