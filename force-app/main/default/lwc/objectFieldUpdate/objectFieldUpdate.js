import { LightningElement, api, wire, track } from 'lwc';
import { createMessageContext, releaseMessageContext, publish, APPLICATION_SCOPE } from 'lightning/messageService';
import MESSAGE_CHANNEL from "@salesforce/messageChannel/loanMessageChannel__c";

import { refreshApex } from '@salesforce/apex';
import ID_FIELD from '@salesforce/schema/Loan__c.Id';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import {
    subscribe,
    unsubscribe,
    onError,
    setDebugFlag,
    isEmpEnabled
} from 'lightning/empApi';

export default class ObjectFieldUpdate extends LightningElement {
    context = createMessageContext();
    subscription = null;
    @track subscribed = false;
    @track rawMessage;
    title;
    messageBody;
    MESSAGE_SOURCE = "lightning:lwc";
 
    @api recordId;
    @api objectApiName;
    @api refreshStatus;
    @track messages = [];
    replayIds = new Set([]);

    @wire(getRecord, { recordId: '$recordId', fields: [ID_FIELD]})
    recordInfo;;


    connectedCallback() {
        window.console.log('Starting DocumentUploadStatus Event Processing');

        setDebugFlag(true);

        onError(error => {
            this.log('DocumentUploadStatus Streaming error: ' + JSON.stringify(error));
        });

        isEmpEnabled().then(response => {
            window.console.log('DocumentUploadStatus isEmpEnabled: ' + JSON.stringify(response));
        });

        subscribe('/event/UploadDocumentResponse__e', -1, event => {

            window.console.log('On UploadDocumentResponse event: ' + JSON.stringify(event));
                if (!(this.replayIds.has(event.data.event.replayId))) {
                    this.replayIds.add(event.data.event.replayId);

                    let recId = event.data.payload.recordId__c;    
                    this.log('This recordId=' + this.recordId);
                    this.log('Got recId=' + recId);
                    
                    if(recId == this.recordId){
                        this.refreshStatus = 'Received updates, so refreshing!';

                        this.log('sendLMSMessage before');
                        const message = {
                            source: this.MESSAGE_SOURCE,
                            recordId: recId,
                            status: 'Refresh'
                        }
                        publish(this.context, MESSAGE_CHANNEL, message);

                        this.log('sendLMSMessage done');
                       
                        refreshApex(this.recordInfo);
                       
                        this.log('refreshApex done');
                    }else{
                        this.refreshStatus = 'Received updates not applicable for this record!';
                    }
                    
                }

            })
            .then(response => {
                this.log('Subscribed for UploadDocumentResponse Events ...');
            });

        window.console.log('Ending UploadDocumentResponse Event Processing');
    }

    log(message) {
       // this.messages.push(message);
       console.log("log message=" + message);
    }

    handleSendMessage(event) {
        console.log('handleSendMessage called');
        const message = {
            source: this.MESSAGE_SOURCE,
            title: 'some',
            message: 'messgae body'
        }
        publish(this.context, MESSAGE_CHANNEL, message);
        console.log('handleSendMessage done');
    }
     
    disconnectedCallback() {
        releaseMessageContext(this.context);

        if (this.subscription) {
            unsubscribe(this.subscription, response => {
                window.console.log('Unsubscribed from: ' + response);
                this.subscription = null;
            });
        }        
    }


    errorCallback(error, stack) {
        console.log(error,stack);
    }
}