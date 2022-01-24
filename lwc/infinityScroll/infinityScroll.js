import { LightningElement } from 'lwc';
import getAccountsList from '@salesforce/apex/AccountController.getAccountsList';
import getAccountNumber from '@salesforce/apex/AccountController.getAccountNumber';

const columns = [
    { label: 'Name', fieldName: 'Name'},
    { label: 'Phone', fieldName: 'Phone'},
    { label: 'Type', fieldName: 'Type'}
];
export default class InfinityScroll extends LightningElement {
 
    data = [];
    columns = columns;
    accountNumber = 0;
    offsetValue = 0;
    limitValue = 20;
    isAddNewData = true;
    
    connectedCallback() {
        this.getAccountsList();
        this.getAccountNumber();
    }

    getAccountsList() {

        getAccountsList({ offsetValue: this.offsetValue, limitValue: this.limitValue})
        .then(result => {
            this.data = this.data.concat(result);
        })
        .catch(error => {
            console.log('error',error);
        })
        .finally(() => {
            this.isAddNewData = true;
        });
    }

    getAccountNumber() {

        getAccountNumber()
        .then(result => {
            this.accountNumber = result;
        })
        .catch(error => {
            console.log('error',error);
        });
    }

    onScroll(event) {

        var scrollRate = event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight )

        if(scrollRate > 0.85 && this.data.length < this.accountNumber && this.isAddNewData) {
            this.isAddNewData = false;
            this.offsetValue += 20;
            this.getAccountsList();
        }
    }

    get getDisplaySpinner() {
        return this.accountNumber > this.data.length;
    }
}