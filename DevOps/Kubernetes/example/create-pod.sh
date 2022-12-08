#!/bin/bash

kubectl run nginx-pod --image=nginx:latest # Create and run a pod
kubectl get pods --watch # Watch the statuses of each pod
kubectl describe pod nginx-pod # Shows detailed information about the pod