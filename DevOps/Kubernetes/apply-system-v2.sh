#!/bin/bash

kubectl config use-context docker-desktop

echo '--> Creating news storages'
kubectl apply -f ./storage/images-pvc.yaml
kubectl apply -f ./storage/sessions-pvc.yaml
kubectl apply -f ./configMaps/news-db-configmap.yaml
kubectl apply -f ./pods/news-db.yaml
kubectl apply -f ./services/news-db-svc.yaml

echo '--> Creating news system'
kubectl apply -f ./configMaps/news-system-configmap.yaml
kubectl apply -f ./statefulSets/news-system-statefulset.yaml
kubectl apply -f ./services/news-system-svc.yaml

echo '--> Creating portal'
kubectl apply -f ./configMaps/news-portal-configmap.yaml
kubectl apply -f ./deployments/news-portal-deployment.yaml
kubectl apply -f ./services/news-portal-svc.yaml
