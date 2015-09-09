'use strict';

describe('ion-autocomplete multiple select', function () {

    var htmlFileName = 'ion-autocomplete.prepopulated.e2e.html';

    it('must prepopulate the model and show the proper values', function () {
        browser.get(htmlFileName);

        expect($('input.ion-autocomplete-test-model').isDisplayed()).toBeTruthy();
        expect($('input.ion-autocomplete-test-model').getAttribute('value')).toEqual('test1,test2');

        expect($('input.ion-autocomplete-selected-items-model').getAttribute('value')).toEqual('[object Object],[object Object]');

        element(by.css('input.ion-autocomplete')).click().then(function () {
            expect($('input.ion-autocomplete-search').isDisplayed()).toBeTruthy();

            var selectedItemList = element.all(by.repeater('selectedItem in viewModel.selectedItems'));
            expect(selectedItemList.count()).toEqual(2);
            expect(selectedItemList.get(0).getText()).toEqual('view: test1');
            expect(selectedItemList.get(1).getText()).toEqual('view: test2');


        });
    });

});