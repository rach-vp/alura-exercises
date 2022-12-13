#!/bin/bash

kubectl config use-context docker-desktop

# Show history
kubectl rollout history deployment nginx-pod

# Annotate last change-cause
kubectl annotate deployment nginx-pod kubernetes.io/change-cause="Defining image version to latest"

# Rollback to version 1
kubectl rollout undo deployment nginx-pod --to-version=1