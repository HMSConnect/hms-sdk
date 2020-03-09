node{
  stage('Checkout'){
    checkout scm
  }

  //  def remote = [:]
  //   remote.name = 'tharit'
  //   remote.host = '192.168.1.133'
  //   // remote.identityFile = '/root/for_jenkins_key'
  //   remote.allowAnyHosts = true
  //   stage('Remote SSH') {
  //     dir(path: '/root'){
  //       // sh 'ls -a'
  //       // remote.identityFile = './for_jenkins_key'
  //       withCredentials([usernamePassword(credentialsId: '14e14940-998e-4ca6-8958-afc15296b1a0', passwordVariable: 'password', usernameVariable: 'userName')]) {
  //         remote.user = userName
  //         remote.password = password
  //         sshCommand remote: remote, command: "echo 'eiei'"
  //       }

  //     }
  //   }

  stage('Initial'){ 
    try{
      parallel(
        'hms-widget': {
            docker.image('node:10.15-alpine').inside {
              dir(path: 'app'){
                sh 'node --version'
                // sh 'npm install'
                sh 'yarn'
                sh 'npm -v'
              }
            }
        },
        'hms-fake': {
           echo 'fake'
        }
      )
  
    } 
    catch (exc) {
      // mail (
      //   to: "tharit@pupasoft.com",
      //   subject: "Failed Pipeline: ${currentBuild.fullDisplayName} - Stage Initial/Client",
      //   body: "Something is wrong with ${env.BUILD_URL}"
      // )
      // deleteDir()
      // cleanWs()
      throw exc
    }
    
  }

  stage('Test'){
    try{
      docker.image('browserless/chrome:1.26-chrome-stable').inside{
        dir(path: 'app'){
          sh "node --version"
          sh 'npm run test'
        }
      }
    }
    catch(exc){
      // mail (
      //   to: "tharit@pupasoft.com",
      //   subject: "Failed Pipeline: ${currentBuild.fullDisplayName} - Stage Test/Client",
      //   body: "Something is wrong with ${env.BUILD_URL}"
      // )
      deleteDir()
      cleanWs()
      throw exc
    }
   
  }

  stage('Prepare Build') {
    // mail (
    //       to: "tharit@pupasoft.com",
    //       subject: "Do you want to deploy: ${currentBuild.fullDisplayName}",
    //       body: "Please comfirm to build ${env.BUILD_URL}"
    //     )
    timeout(time: 120, unit: "MINUTES") {
      try {
        input message: 'Do you want to approve the build?', ok: 'Yes'
      }
      catch (error){
        echo 'abort'
        // deleteDir()
        // cleanWs()
        throw error
      }
    }
  }
    
  stage('Build'){
    // try {
    //   dir(path: 'server'){
    //     sh './grailsw war'
    //   }
    // }
    // catch (exc) {
    //   echo 'Something failed, I should sound the klaxons!'
    //   mail (
    //     to: "tharit@pupasoft.com",
    //     subject: "Failed Pipeline: ${currentBuild.fullDisplayName} - Stage Build/Server",
    //     body: "Something is wrong with ${env.BUILD_URL}"
    //   )
    //   deleteDir()
    //   throw exc
    // }
    docker.image('node:10.15-alpine').inside {
      try {
        dir(path: 'app'){
          // sh 'cat ./src/app/app-menu/main-menu/main-menu.component.html'
          sh 'export NODE_ENV=production && npm run build '
          // sh 'npm run build-prod'
        }
      }
      catch (exc) {
        echo 'Something failed, I should sound the klaxons!'
        // mail (
        //   to: "tharit@pupasoft.com",
        //   subject: "Failed Pipeline: ${currentBuild.fullDisplayName} - Stage Build/Client",
        //   body: "Something is wrong with ${env.BUILD_URL}"
        // )
        // deleteDir()
        throw exc
      }
    }
  }

  // stage('check to deploy') {
  //   mail (
  //         to: "tharit@pupasoft.com",
  //         subject: "Do you want to deploy: ${currentBuild.fullDisplayName}",
  //         body: "Please comfirm to deploy ${env.BUILD_URL}"
  //       )
  //   timeout(time: 120, unit: "MINUTES") {
  //     try {
  //       input message: 'Do you want to approve the deploy in server?', ok: 'Yes'
  //     }
  //     catch (error){
  //       echo 'abort'
  //       sh 'docker start vsc-mysql'
  //       sh 'docker start vsc-tomcat'
  //       sh "docker start vsc-nginx" 
  //       deleteDir()
  //       throw error
  //     }
      
  //   }
  // }

  stage('Deploy-server'){ 
    dir(path: 'fake'){
      sh 'ls'
      sh 'scp -r . /app/hms-fake-data'
      sh 'docker restart hms-fake-data'
    }
    
    dir(path: 'app'){
      sh "docker stop hms-sdk-widget"  
      sh 'ls -a'
      sh 'rm -rf /app/hms-sdk-widget/.next'
      sh 'scp -r .next /app/hms-sdk-widget/.next'
      sh "docker start hms-sdk-widget"  
    }
    // deleteDir()
    // cleanWs()
  }

}
