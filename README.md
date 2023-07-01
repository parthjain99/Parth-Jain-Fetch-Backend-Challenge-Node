# Fetch-Backend-Challenge-Node

This repository contains the backend code for the Fetch Backend Challenge implemented in Node.js.

## Using Docker

### Set Up
1. Install Docker by following the instructions in the official Docker documentation: [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/).

2. Clone repository
```
git clone https://github.com/parthjain99/Fetch-Backend-Challenge-Node.git
```

### Starting the server
1. Navigate to the directory where the Dockerfile is located.
```
cd
```

3. Build the Docker image by running the following command:
    ```
    docker build. -t node-fetch-backend
    ```

4. Run the Docker container with the following command:
    ```
    docker run -p 5001:5001 -d node-fetch-backend
    ```

5. The server should now be running and accessible on port 5001. You can access it using the following URL:
    ```
    http://localhost:5001/recipts
    ```

### Testing
1. Install frisby
    ```
    npm install frisby
    ```
2. Run unit tests with the following command:
    ```
    npm run test
    ```

3. To test the "POST" request for a receipt, you can use cURL with the following command:
    ```
    curl -H 'Content-Type: application/json' \
            -d '{
        "retailer": "Walgreens",
        "purchaseDate": "2022-01-02",
        "purchaseTime": "08:13",
        "total": "2.65",
        "items": [
            {"shortDescription": "Pepsi - 12-oz", "price": "1.25"},
            {"shortDescription": "Dasani", "price": "1.40"}
        ]
    }' \
          -X POST \
          http://localhost:5001/receipts/process
    ```

4. To get points for a specific ID, use the following cURL command:
    ```
    curl  http://localhost:5001/receipts/[id]/points
    ```

### Stop the server
1. Get the container ID by running the following command:
    ```
    docker ps
    ```

2. Kill the Docker container using the container ID with the following command:
    ```
    docker kill [container-id]
    ```
