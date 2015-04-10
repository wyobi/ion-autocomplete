'use strict';

describe('ion-autocomplete single select', function () {

    var htmlFileName = 'ion-autocomplete.single-select.e2e.html';

    it('must not show the search input field by default', function () {
        browser.get(htmlFileName);
        expect($('input.ion-autocomplete-search').isDisplayed()).toBeFalsy();
    });

    it('must show the search input field if the input field is clicked', function () {
        browser.get(htmlFileName);
        element(by.css('input.ion-autocomplete')).click().then(function () {
            expect($('input.ion-autocomplete-search').isDisplayed()).toBeTruthy();
        });
    });

    it('must hide the search input field if the cancel button is pressed', function () {
        browser.get(htmlFileName);

        element(by.css('input.ion-autocomplete')).click().then(function () {
            expect($('input.ion-autocomplete-search').isDisplayed()).toBeTruthy();

            element(by.css('button.ion-autocomplete-cancel')).click().then(function () {
                expect($('input.ion-autocomplete-search').isDisplayed()).toBeFalsy();
            });

        });
    });

    it('must show the list of found items if something is entered in the search', function () {
        browser.get(htmlFileName);

        element(by.css('input.ion-autocomplete')).click().then(function () {
            expect($('input.ion-autocomplete-search').isDisplayed()).toBeTruthy();

            element(by.css('input.ion-autocomplete-search')).sendKeys("test");

            var itemList = element.all(by.repeater('item in items'));
            expect(itemList.count()).toEqual(3);
            expect(itemList.get(0).getText()).toEqual('view: test1');
            expect(itemList.get(1).getText()).toEqual('view: test2');
            expect(itemList.get(2).getText()).toEqual('view: test3');

        });
    });

    it('must hide the search input field if a item in the list is clicked', function () {
        browser.get(htmlFileName);

        element(by.css('input.ion-autocomplete')).click().then(function () {
            expect($('input.ion-autocomplete-search').isDisplayed()).toBeTruthy();

            element(by.css('input.ion-autocomplete-search')).sendKeys("test");

            var itemList = element.all(by.repeater('item in items'));
            expect(itemList.count()).toEqual(3);
            itemList.get(0).click().then(function () {
                expect($('input.ion-autocomplete-search').isDisplayed()).toBeFalsy();
                expect($('input.ion-autocomplete-test-model').isDisplayed()).toBeTruthy();
                expect($('input.ion-autocomplete-test-model').getAttribute('value')).toEqual('test1');
            })

        });
    });

});