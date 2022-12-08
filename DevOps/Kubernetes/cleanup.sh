#!/bin/bash

kubectl config use-context docker-desktop
kubectl delete -f ./news-db-svc.yaml
kubectl delete -f ./news-db.yaml
kubectl delete -f ./news-portal-svc.yaml
kubectl delete -f ./news-portal.yaml
kubectl delete -f ./news-system-configmap.yaml
kubectl delete -f ./news-system-svc.yaml
kubectl delete -f ./news-system.yaml
kubectl delete -f ./news-db-configmap.yaml
kubectl delete -f ./news-system-configmap.yaml
kubectl delete -f ./news-portal-configmap.yaml