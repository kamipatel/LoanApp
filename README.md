# LoanApp Dynamic Forms/Action Sample Application

This is a sample application that demonstrates how to build applications using Summer'20 features e.g. 
Dynamic Forms/Actions
Lightning Flow object and event listener
Lightning Messaging Service 

It leverages existing features e.g.
Lighting Platform Events (emp.js)

## Installing LoanApp using a Scratch Org

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

    - Enable Dev Hub in your Trailhead Playground
    - Install Salesforce CLI
    - Install Visual Studio Code
    - Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

2. If you haven't already done so, authorize your hub org and provide it with an alias (**myhuborg** in the command below):

    ```
    sfdx force:auth:web:login -d -a myhuborg
    ```

3. Clone the repository:

    ```
    git clone https://github.com/kamipatel/LoanApp.git
    cd loanapp
    ```

4. Create a scratch org and provide it with an alias (**ebikes** in the command below):

    ```
    sfdx force:org:create -s -f config/project-scratch-def.json -a loan
    ```

5. Push the app to your scratch org:

    ```
    sfdx force:source:push -u loan
    ```

6. Assign the **loan** permission set to the default user:

    ```
    sfdx force:user:permset:assign -n loanapp -u loan
    ```

6. Open the scratch org:

    ```
    sfdx force:org:open -u loan
    ```

8. In **Setup**, under **Path**, activate the **Lightning Lite** Path.

9. In App Launcher, select the **Loan** app.


# Testing: Mimic on DocummentUpload, Third party verification Completion 
sfdx force:data:record:create -s UploadDocumentResponse__e -v "recordId__c='***'" -u loan