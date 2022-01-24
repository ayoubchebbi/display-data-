import { LightningElement } from 'lwc';
import getAccountsList from '@salesforce/apex/AccountController.getAccountsList';
import getAccountNumber from '@salesforce/apex/AccountController.getAccountNumber';

const columns = [
    { label: 'Name', fieldName: 'Name'},
    { label: 'Phone', fieldName: 'Phone'},
    { label: 'Type', fieldName: 'Type'}
];

export default class SeeMore extends LightningElement { 

    data = [];
    columns = columns;
    accountNumber = 0;
    offsetValue = 0;
    limitValue = 10;
    isDisplaySpinner = false;
    
    connectedCallback() {
        this.getAccountsList();
        this.getAccountNumber();
    }

    getAccountsList() {

        this.isDisplaySpinner = true;
        getAccountsList({ offsetValue: this.offsetValue, limitValue: this.limitValue})
        .then(result => {
            this.data = this.data.concat(result);
        })
        .catch(error => {
            console.log('error',error);
        })
        .finally(() => {
            this.isDisplaySpinner = false;
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

    displayData() {
        this.offsetValue += 10;
        this.getAccountsList();
    }

    get getDisplaySeeMoreButton() {
        return this.accountNumber > this.data.length;
    }
}