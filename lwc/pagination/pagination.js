import { LightningElement, api, track } from 'lwc';

export default class Pagination extends LightningElement {


    @track paginatonButtonNumber;
    @track currentPage = 1;
    @track listButton = [];

    @api lineNumber;
    @track recordNumber = 10;

    connectedCallback() {

        this.paginatonButtonNumber = Math.floor(this.lineNumber / this.recordNumber);

        if (this.lineNumber - (this.paginatonButtonNumber * this.recordNumber) != 0) {
            this.paginatonButtonNumber += 1;
        }

        if (this.paginatonButtonNumber > 4) {
            this.listButton.push({ index: 1, className: 'slds-button slds-button_icon slds-button_icon-border-filled slds-is-selected pointer' });
            this.listButton.push({ index: 2, className: 'slds-button slds-button_icon slds-button_icon-border-filled pointer' });
            this.listButton.push({ index: '...', className: 'point-css' });
            this.listButton.push({ index: this.paginatonButtonNumber - 1, className: 'slds-button slds-button_icon slds-button_icon-border-filled pointer' });
            this.listButton.push({ index: this.paginatonButtonNumber, className: 'slds-button slds-button_icon slds-button_icon-border-filled pointer' });
        } else {
            for (let i = 1; i <= this.paginatonButtonNumber; i++) {
                let className = (i == 1) ? 'slds-button slds-button_icon slds-button_icon-border-filled slds-is-selected pointer' : 'slds-button slds-button_icon slds-button_icon-border-filled pointer';
                this.listButton.push({ index: i, className: className });
            }
        }
    }

    updateListButton(index, type) {

        let fixePageNumber;
        let displayPageNumber;
        let displayPageNumberDouble;
        let pageNumberDisplay;

        if (type == 'next') {
            fixePageNumber = 1;
            displayPageNumberDouble = index - 2;
            displayPageNumber = index + 1;
            pageNumberDisplay = (displayPageNumber <= this.paginatonButtonNumber);
        } else {
            fixePageNumber = this.paginatonButtonNumber;
            displayPageNumberDouble = index + 2;
            displayPageNumber = index - 1;
            pageNumberDisplay = (displayPageNumber > 1);
        }

        let rowUpdate = this.listButton.find(row => {
            return row.index == index;
        });

        this.listButton = this.listButton.filter(function (row) {
            return (row.index == fixePageNumber || row.index != displayPageNumberDouble) && row.index != '...';
        })

        if (rowUpdate == undefined) {
            this.listButton.push({ index: index, className: 'slds-button slds-button_icon slds-button_icon-border-filled pointer' });
        }

        if (this.listButton.map(row => row.index).indexOf(displayPageNumber) == -1 && pageNumberDisplay) {
            this.listButton.push({ index: displayPageNumber, className: 'slds-button slds-button_icon slds-button_icon-border-filled pointer' });
        }

        this.listButton.sort(function (a, b) {
            return a.index - b.index;
        });

        this.listButton.forEach((row, index) => {

            if (index + 1 < this.listButton.length) {
                let nextElement = this.listButton[index + 1];

                if ((this.listButton[index + 1].index - row.index) != 1 && row.index != '...' && nextElement.index != '...') {
                    this.listButton.splice(index + 1, 0, { index: '...', className: 'point-css' });
                }
            }
        });
    }

    next() {

        if (this.currentPage < this.paginatonButtonNumber) {

            this.updateListButton(this.currentPage + 1, 'next');

            this.activeButton('remove', this.currentPage);
            this.currentPage += 1;
            this.activeButton('add', this.currentPage);
            this.changepagination();
        }
    }

    previous() {

        if (this.currentPage > 1) {

            this.updateListButton(this.currentPage - 1, 'previous');

            this.activeButton('remove', this.currentPage);
            this.currentPage -= 1;
            this.activeButton('add', this.currentPage);
            this.changepagination();
        }
    }

    last() {

        if (this.currentPage < this.paginatonButtonNumber) {

            this.updateListButton(this.paginatonButtonNumber, 'previous');

            this.activeButton('remove', this.currentPage);
            this.currentPage = this.paginatonButtonNumber;
            this.activeButton('add', this.currentPage);
            this.changepagination();
        }
    }

    first() {

        if (this.currentPage > 1) {

            this.updateListButton(1, 'previous');

            this.activeButton('remove', this.currentPage);
            this.currentPage = 1;
            this.activeButton('add', this.currentPage);
            this.changepagination();
        }
    }

    getDataFromIndex(event) {

        let buttonValue = event.currentTarget.dataset.id;

        if (this.currentPage != buttonValue && buttonValue != '...') {

            buttonValue = Number(buttonValue);
            this.listButton = [];

            this.listButton.push({ index: buttonValue, className: 'slds-button slds-button_icon slds-button_icon-border-filled pointer' });
            this.activeButton('add', buttonValue);


            if ((buttonValue - 1) > 1) {
                this.listButton.push({ index: (buttonValue - 1), className: 'slds-button slds-button_icon slds-button_icon-border-filled pointer' });
            }

            if (buttonValue + 1 < this.paginatonButtonNumber) {
                this.listButton.push({ index: (buttonValue + 1), className: 'slds-button slds-button_icon slds-button_icon-border-filled pointer' });
            }

            if (this.listButton.map(row => row.index).indexOf(1) == -1) {
                this.listButton.push({ index: 1, className: 'slds-button slds-button_icon slds-button_icon-border-filled pointer' });
            }

            if (this.listButton.map(row => row.index).indexOf(this.paginatonButtonNumber) == -1) {
                this.listButton.push({ index: this.paginatonButtonNumber, className: 'slds-button slds-button_icon slds-button_icon-border-filled pointer' });
            }

            this.listButton.sort(function (a, b) {
                return a.index - b.index;
            });

            this.listButton.forEach((row, index) => {

                if (index + 1 < this.listButton.length) {
                    let nextElement = this.listButton[index + 1];

                    if ((this.listButton[index + 1].index - row.index) != 1 && row.index != '...' && nextElement.index != '...') {
                        this.listButton.splice(index + 1, 0, { index: '...', className: 'point-css' });
                    }
                }
            });

            if (this.currentPage == 1 || this.currentPage == this.paginatonButtonNumber) {
                this.activeButton('remove', this.currentPage);
            }

            this.currentPage = buttonValue;

            this.activeButton('remove', buttonValue + 1);
            this.activeButton('remove', buttonValue - 1);
            this.changepagination();
        }
    }

    activeButton(type, id) {

        if (this.template.querySelector('[data-id="' + id + '"]') != null) {
            if (type == 'add') {
                this.template.querySelector('[data-id="' + id + '"]').classList.add('slds-is-selected');
            } else if (type == 'remove') {
                this.template.querySelector('[data-id="' + id + '"]').classList.remove('slds-is-selected');
            }
        }
    }

    changepagination() {

        this.dispatchEvent(new CustomEvent("changepage", {
            detail: (this.currentPage - 1) * this.recordNumber
        }));
    }

    get isDisplayNextButton() {
        return this.currentPage != this.paginatonButtonNumber;
    }

    get isDisplayPreviousButton() {
        return this.currentPage != 1;
    }
}