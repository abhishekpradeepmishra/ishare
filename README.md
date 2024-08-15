# iShare (Content Sharing App)

This application is a sample content sharing app. Application allows you to share pics, videos and articles. You can like a content or comments on content. The application is enabled to give contextual recommendation to people. 

## High Level Use cases

1. Users can share their videos and pics in a secure way
2. Users can like, share and comment on a video or pic
3. Users can set preferences on topics they want to see content
4. Users are given content recommendations based on their usage patterns
5. Users can chat with others

##  High Level Architecture

The application is modelled as a **Hybrid Mobile application** built on **reactjs** and **ionic framework.**. Application backend is modelled as a microservices architecture. Microservices expose **http** and **socket** based APIs for consumption from application layer.

![](./assets/highleveldesign.png)
 

## Application features:

1. API Driven application backend
2. Data Security and Encription at rest
3. API Security
4. User Managment
5. Capability to store user's assets videos, articles and images
6. Content Recommendation based on preferences, user access patterns
7. DevOps


Application backend comprises of 4 Microservices APIs

1. **PostManagement**

Post Management is responsible for providing CRUD operations for application assets videos, images and articles.

[click for details](./API/PostManagement)


2. **CommunicationManagement**

Communication Management is responsible for providing email, push and sms based communication

[click for details](./API/CommunicationManagement)


3. **UserManagement**

User Management is responsible for providing CRUD operations for users, managing user preferences
[click for details](./API/UserManagement)


4. **NetworkManagement**

Network Management is responsible for tracking use access patterns, build social graph and generate recommendations for users

[click for details](./API/NetworkManagement)


## Application Setup

**Pre-requisite**

1. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. [AWS Command Line Interface](https://aws.amazon.com/cli/)
3. [SAM Command Line Interface](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
4. [NodeJS](https://nodejs.org/en/)
5. [Ionic](https://ionicframework.com/docs/intro/cli)


**Clone the files locally**

Replace __&lt;gitrepositoryurl>__ with repository url

```
git clone <gitrepositoryurl>
```

**Create S3 bucket to uplaod artefacts**

update &lt;alias> with your user alias

```

aws s3 mb s3://workshop-<alias> --region <awsregion>

```

**Update the SAM configuration template**

update values for &lt;AWSRegion> and &lt;AWSS3Bucket>. Updated values will look similar to below

```
s3_bucket = "workshop-<alias>"
region = "<awsregion>"

```

**Setup Base infra**

Use the _template.yaml_ at root folder to create the base infra needed for the application to work. The template sets up **Amazon Cognito User pool** and **Cloud 9 IDE**. 

Run the commands

```
sam build
sam deploy
```

Wait for the execution to complete. 

Next step is to setup individual services, go to [PostManagement](./API/PostManagement) folder

## Workflow Design


**Scenario:** Imagine you’ve been tasked to build an instagram-like application , uploading/ displaying/deleting images, while being able to like or comment. How would you build this application? 


**What would you learn in this workshop?**
How you would design the microservices architecture?
How would you secure the environment and APIs?
Which data stores would you use?
Which software frameworks would you use?
Software Implementation and data modelling

**Tech Domains**
Serverless + API
Datastore
Security, IaC , integration


**Proposed Architecture:**
![](./designs/images/architecture.png) 
**Idea and collaterals:**

**Teams:**

![](./designs/images/teams.png) 
**Milestones:**


**Milestone 1: Home Screen Setup Locally with Authentication** 
![](./designs/images/m1.png) 

Milestone 1 Dependencies: 

* None


* * *

**Milestone 2: Home Screen read from persistent store (optionally with security)**

![](./designs/images/m2.png) 

Milestone 2 Dependencies: 

* Milestone 1 items
* Do you need separate S3 images to store images? Or can we use one created as part of milestone 1?

* * *

**Milestone 3: Home/Comments screen write to persistent store**

![](./Designs/images/m3.png) 

Milestone 3 Dependencies: 

* None

* * *
**Milestone 4: Infra to respond to changes to DynamoDB table is setup**
![](./designs/images/m4.png) 

Milestone 4 Dependencies: 

* DyanomoDB table


**Milestone 5 Write notification to redis cache**

![](./designs/images/m5.png) 

Milestone 5 Dependencies

* SNS topic from Milestone 4


* * *

**Milestone 6: Notification Screen from application is working against API integrated with Redis cluster**

![](./designs/images/m6.png) 

Milestone 6 Dependencies:

* Redis cluster from Milestone 5


* * *
**Milestone 7: Recommendations flow-backend**

![](./designs/images/m7.png) 

Milestone 7 Dependencies


* SNS topic from milestone 4


* * *

**Milestone 8: Recommendation flow API & UI**
![](./designs/images/m8.png) 

Milestone 8 Dependencies


* Neptune database from milestone 7

* * *
Milestone 9: User Preference Screen
![](./designs/images/m9.png) 

Milestone 9 Dependencies

* Milestone 2,3,4 for DynamoDB table design (Single table design)

