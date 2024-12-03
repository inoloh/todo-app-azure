pipeline {
    environment {
        DOCKERHUB_REGISTRY = 'todo-app-dockerhub-registry'
        registryCredential = 'dockerHub'
    }

    agent any

    stages {
        stage('HELLO') {
            steps {
                echo 'Hello World again!!'
            }
        }
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                    }
                }
                steps {
                    sh '''
                        ls -la
                        node --version
                        npm --version
                    '''
                }
            }
        stage('Build Docker image in script') {
            steps {
                sh '''
                    docker build -t helenazzz-app .
                    '''
            }
        }
        stage('Build Docker image for dockerhub') {
            steps {
                script {
                    dockerImage = docker.build DOCKERHUB_REGISTRY + ":$env.BUILD_NUMBER"
                }
            }
        }
        stage('Deploy Docker image to dockerhub') {
            steps {
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
    }
}