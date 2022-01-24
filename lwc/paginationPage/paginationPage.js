import { LightningElement } from 'lwc';
import getAccountsList from '@salesforce/apex/AccountController.getAccountsList';
import getAccountNumber from '@salesforce/apex/AccountController.getAccountNumber';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Type', fieldName: 'Type' }
];

export default class PaginationPage extends LightningElement {

    data = [];
    columns = columns;
    accountNumber = 0;
    offsetValue = 0;
    limitValue = 10;
    columns = columns;
    isDisplayPaginationList = false;
    isLoadingSpinner = false;

    connectedCallback() {
        this.getAccountsList();
        this.getAccountNumber();
    }


    // get Account list
    getAccountsList() {

        this.isLoadingSpinner = true;
        getAccountsList({ offsetValue: this.offsetValue, limitValue: this.limitValue })
            .then(result => {
                this.data = result;
            })
            .catch(error => {
                console.log('error', error);
            })
            .finally(() => {
                this.isLoadingSpinner = false;
            });
    }

    // get number for all account
    getAccountNumber() {

        this.isDisplayPaginationList = true;
        getAccountNumber()
            .then(result => {
                this.accountNumber = result;
            })
            .catch(error => {
                console.log('error', error);
            })
            .finally(() => {
                this.isDisplayPaginationList = false;
            });
    }

    // get new data list
    handlerChangePage(event) {
        this.offsetValue = event.detail;
        this.getAccountsList();
    }

    get getDataNumber() {
        return this.data.length;
    }
}