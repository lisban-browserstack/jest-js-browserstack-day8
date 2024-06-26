pipeline {
   agent any
   stages {
      stage('setup') {
         steps {
            browserstack(credentialsId: '19a621eb-cbe1-4c11-adec-dd57e7029ebe') {
               echo "hello"
            }
         }
      }
    }
  }
