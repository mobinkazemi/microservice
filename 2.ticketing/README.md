# Notes on Starting up services

### 1. Define secret object inside k8s to handle JWT secret securely, using below command. replace (your signing secret key) with your desired key

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=(your signing secret key)
```

for example:

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=superseeeeecreeeeetkeey
```
