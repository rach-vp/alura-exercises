#!/bin/bash

kubectl config use-context docker-desktop

echo '--> Terminating'
kubectl delete -f ./configMaps/news-system-configmap.yaml
kubectl delete -f ./statefulSets/news-system-statefulset.yaml
kubectl delete -f ./services/news-system-svc.yaml
kubectl delete -f ./configMaps/news-portal-configmap.yaml
kubectl delete -f ./deployments/news-portal-deployment.yaml
kubectl delete -f ./services/news-portal-svc.yaml

echo '--> Creating news system'
kubectl apply -f ./configMaps/news-system-configmap.yaml
kubectl apply -f ./statefulSets/news-system-statefulset.yaml
kubectl apply -f ./services/news-system-svc.yaml

echo '--> Creating portal'
kubectl apply -f ./configMaps/news-portal-configmap.yaml
kubectl apply -f ./deployments/news-portal-deployment.yaml
kubectl apply -f ./services/news-portal-svc.yaml