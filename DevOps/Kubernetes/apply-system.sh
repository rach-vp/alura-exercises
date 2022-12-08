#!/bin/bash

kubectl config use-context docker-desktop

echo '--> Creating DB'
kubectl apply -f ./news-db-configmap.yaml
kubectl apply -f ./news-db.yaml
kubectl apply -f ./news-db-svc.yaml

echo '--> Creating news system'
kubectl apply -f ./news-system-configmap.yaml
kubectl apply -f ./news-system.yaml
kubectl apply -f ./news-system-svc.yaml

echo '--> Creating portal'
kubectl apply -f ./news-portal-configmap.yaml
kubectl apply -f ./news-portal.yaml
kubectl apply -f ./news-portal-svc.yaml