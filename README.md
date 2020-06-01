# LoanApp Dynamic Forms/Action Sample Application

This is a sample application that demonstrates how to build applications using Summer'20 features e.g. 
- Dynamic Forms/Actions
- Lightning Flow object and event listener
- Lightning Messaging Service 

It also demonstrates use of existing features e.g.
- Lighting Platform Events (emp.js)

## Installing LoanApp using a Scratch Org

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

    - Enable Dev Hub in your Trailhead Playground
    - Install Salesforce CLI
    - Install Visual Studio Code
    - Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

# Make sure  your DevHub is Summer'20

2. If you haven't already done so, authorize your hub org and provide it with an alias (**myhuborg** in the command below):

    ```
    sfdx force:auth:web:login -d -a myhuborg
    ```

3. Clone the repository:

    ```
    git clone https://github.com/kamipatel/LoanApp.git
    cd LoanApp
    ```

4. Create a scratch org and provide it with an alias (**loan** in the command below):

    ```
    sfdx force:org:create -s -f config/project-scratch-def.json -a loan
    ```

5. Open the scratch org:

    ```
    sfdx force:org:open -u loan
    ```

6. In **Setup**, under **Record Page Settings Settings**, enable the **Dynamic Forms (Non-GA Preview, desktop only)**.

7. In **Setup**, under **Path Settings**, enable the **Path**.

8. Push the app to your scratch org:

    ```
    sfdx force:source:push -u loan
    ```

9. Assign the **loan** permission set to the default user:

    ```
    sfdx force:user:permset:assign -n loanapp -u loan
    ```

10. In App Launcher, select the Loan "Processing" app and "Loans" tab.

11. Create a loan and from gear icon on top, select "Edit Page", make sure dynamic actionns beta is checked, make sure to save the page

# Testing: 
- On the load record page, using Path mark status as 'New' stage complete 
- Upload documents and from Path mark status as 'DocumentsUploaded' stage complete
- Simulate on DocumentUpload, Third party verification completion by creating an event, replace *** with salesforce loan record id
sfdx force:data:record:create -s UploadDocumentResponse__e -v "recordId__c=***" -u loan
- That should advance the stage to "SentToThirdPartyForVerification". Path, dynamic forms, dynamic actions should refresh. Also Visualforce should get LMS message.
