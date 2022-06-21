# Comet-Assignment

## Always send two headers mentioned below
### 'x-github-token' : \<personal-access-token\>
### 'x-username' : \<github-username\>
  
  
  
# Routes
  
  > ## API endpoint that can create a repo with the name provided by the user
  ### */api/repository* (POST)
  ### Body 
  - repo_name : (name for new repository) (Required)
  - visibility : true or false
  - description : descritpion for repository

 > ## API endpoint that can list all Repos of a User 
  ### */api/repos* (POST)
  ### Body 
  - username (if empty should return repos of the authenticated user)



  > ## API endpoints for listing, updating, and deleting repo topics
  ### */api/topics_list* (POST) ( list all topics )
  ### Body 
  - repo_name : (Required)
  - username (if empty should return repos of the authenticated user) \

  ### */api/topics_update* (POST) ( list all topics )
  ### Body 
  - repo_name : (Required)
  - username (if empty should return repos of the authenticated user)
  - topics_list

  * It will update all topics with  new given topic list

  

  > ## API endpoints for listing all contributors, stargazers
  ### */api/contributions* (POST)
  ### Body 
  - repo_name : (Required)
  - username (if empty should return repos of the authenticated user)



  > ## API endpoint to list all the repos of a given user with > 5 stars and > 5 forks
  ### */api/starfork5* (POST)
  ### Body 
  - username (if empty should return repos of the authenticated user)



  > ## API endpoint to list all the stargazers who have started more than 2 repos of a given user
  ### */api/stargazersgt2* (POST)
  ### Body 
   - username (if empty should return repos of the authenticated user)



  > ##  API endpoint to list all the stargazers who have started exactly 2 repos of a given user
  ### */api/stargazerseq2* (POST)
  ### Body 
  - username (if empty should return repos of the authenticated user)

  > ## API endpoint to list all the repos of a given user with > 5 commits in last 10 days
  ### */api/commit10* (POST)
  ### Body 
  - username (if empty should return repos of the authenticated user)

  > ## API endpoint to list all the repos of a given user with > 5 commits by owner in last 10 days
  ### */api/commitowner10* (POST)
  ### Body 
  - username (if empty should return repos of the authenticated user)

 



  
  
  
  
  
