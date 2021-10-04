![CI/CD Pipeline](/docs/pics/cicd_pipeline.jpg "CI/CD Pipeline")

# CI/CD Pipeline

## 1. Push to GitHub

## 2. Build project

## 3. Run tests

## 4. Deploy to Docker Hub

# Best Practices

### #1. Commit Daily

Should integrate code early and often to the main branch of their code repository. This prevents maintenance hell on both feature and main branches as developers progress on feature development. Even if feature development is still a work in progress, the work can remain invisible to any end-user or tester of the main branch.

### #2. Fix The Broken Builds

The third practice involves fixing broken builds of code. Continuous integration assumes the software development teams are developing on known stable versions of code. If the teams are struggling to keep their application code stable and well-tested, it is recommended to ensure that the build and test process is available and visible to the development teams.

### #3. Continuously Automate the Delivery Lifecycle

Every organization has a process for creating and delivering code. This process may change over time due to new technologies, teams, or processes. An important practice is to continually evaluate which processes and tests need to be integrated or automated into a CI/CD pipeline. 

# Graph (experimental)


```mermaid
graph LR
A[Git PUSH] --> B[Build project]
B --> C[Run tests]
C --> D[Push to dockerhub]
```
