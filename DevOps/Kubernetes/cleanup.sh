#!/bin/bash

kubectl config use-context docker-desktop
kubectl delete -f services
kubectl delete -f pods
kubectl delete -f deployments
kubectl delete -f replicasets
kubectl delete -f storage
kubectl delete -f statefulSets --force
kubectl delete -f configMaps