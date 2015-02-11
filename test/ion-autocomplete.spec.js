'use strict';

describe('ion-autocomplete', function () {

    var scope, document, compile;

    // load the directive's module
    beforeEach(module('ionic'));
    beforeEach(module('ion-autocomplete'));

    beforeEach(inject(function ($rootScope, $document, $compile) {
        scope = $rootScope.$new();
        document = $document;
        compile = $compile;
    }));

    afterEach(function () {
        // remove the autocomplete container from the dom after each test to have an empty body on each test start
        getSearchContainerElement().remove();
    });

    it('must not initialize anything if the ng-model is not set', function () {
        compileElement('<ion-autocomplete />');

        // expect that no element is added to the body
        expect(getSearchContainerElement().length).toBe(0);
        expect(getSearchInputElement().length).toBe(0);
        expect(getCancelButtonElement().length).toBe(0);
    });

    it('must have the default values set', function () {
        var element = compileElement('<ion-autocomplete ng-model="model"/>');

        // expect the default values of the input field
        expect(element[0].type).toBe('text');
        expect(element[0].readOnly).toBe(true);
        expect(element.hasClass('ion-autocomplete')).toBe(true);
        expect(element[0].placeholder).toBe('');

        // expect the default values of the search input field
        var searchInputElement = getSearchInputElement();
        expect(searchInputElement[0].type).toBe('search');
        expect(searchInputElement.hasClass('ion-autocomplete-search')).toBe(true);
        expect(searchInputElement[0].placeholder).toBe('');

        // expect the default values of the cancel button
        var cancelButtonElement = getCancelButtonElement();
        expect(cancelButtonElement.hasClass('button')).toBe(true);
        expect(cancelButtonElement.hasClass('button-clear')).toBe(true);
        expect(cancelButtonElement[0].innerText).toBe('Cancel');
    });

    it('must set the placeholder on the input field and on the search input field', function () {
        var placeholderValue = "placeholder value";
        var element = compileElement('<ion-autocomplete ng-model="model" placeholder="' + placeholderValue + '"/>');

        expect(element[0].placeholder).toBe(placeholderValue);
        expect(getSearchInputElement()[0].placeholder).toBe(placeholderValue);
    });

    it('must set the cancel label on the button', function () {
        var cancelLabelValue = "Cancel Button";
        compileElement('<ion-autocomplete ng-model="model" cancel-label="' + cancelLabelValue + '"/>');

        expect(getCancelButtonElement()[0].innerText).toBe(cancelLabelValue);
    });

    it('must get the proper item value', function () {
        var element = compileElement('<ion-autocomplete ng-model="model"/>');

        var itemValue = element.isolateScope().getItemValue("no-object");
        expect(itemValue).toBe("no-object");

        itemValue = element.isolateScope().getItemValue({ key: "value"}, "key");
        expect(itemValue).toBe("value");
    });

    it('must not call the items method if the passed query is undefined', function () {
        scope.itemsMethod = jasmine.createSpy("itemsMethod");
        var element = compileElement('<ion-autocomplete ng-model="model" items-method="itemsMethod(query)"/>');

        element.isolateScope().$digest();

        expect(scope.itemsMethod.callCount).toBe(0);
        expect(element.isolateScope().items.length).toBe(0);
    });

    it('must not call the items method if the passed query is empty', function () {
        scope.itemsMethod = jasmine.createSpy("itemsMethod");
        var element = compileElement('<ion-autocomplete ng-model="model" items-method="itemsMethod(query)"/>');

        element.isolateScope().searchQuery = "";
        element.isolateScope().$digest();
        //element.isolateScope().$digest();
        //scope.$digest();
        //expect(getSearchInputElement()[0].innerText).toBe("asd");

        expect(scope.itemsMethod.callCount).toBe(0);
        expect(element.isolateScope().items.length).toBe(0);
    });

    it('must call the items method if the passed query is valid', function () {
        scope.itemsMethod = function(query) {
            return [query, 'item2'];
        };
        spyOn(scope, 'itemsMethod').andCallThrough();
        var element = compileElement('<ion-autocomplete ng-model="model" items-method="itemsMethod(query)"/>');

        element.isolateScope().searchQuery = "asd";
        element.isolateScope().$digest();

        expect(scope.itemsMethod.callCount).toBe(1);
        expect(scope.itemsMethod).toHaveBeenCalledWith("asd");
        expect(element.isolateScope().items.length).toBe(2);
        expect(element.isolateScope().items).toEqual(['asd', 'item2']);
    });

    it('must show the items method if the passed query is valid', function () {
        scope.itemsMethod = function(query) {
            return [query, 'item2'];
        };
        spyOn(scope, 'itemsMethod').andCallThrough();
        var element = compileElement('<ion-autocomplete ng-model="model" items-method="itemsMethod(query)"/>');

        element.isolateScope().searchQuery = "asd";
        element.isolateScope().$digest();

        expect(scope.itemsMethod.callCount).toBe(1);
        expect(scope.itemsMethod).toHaveBeenCalledWith("asd");
        expect(element.isolateScope().items.length).toBe(2);
        expect(element.isolateScope().items).toEqual(['asd', 'item2']);
    });

    /**
     * Compiles the given element and executes a digest cycle on the scope.
     *
     * @param element the element to compile
     * @returns {*} the compiled element
     */
    function compileElement(element) {
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    /**
     * Gets the angular element for the autocomplete search container div
     * @returns {*} the search container element
     */
    function getSearchContainerElement() {
        return angular.element(document[0].querySelector('div.ion-autocomplete-container'))
    }

    /**
     * Gets the angular element for the autocomplete search input field
     * @returns {*} the search input element
     */
    function getSearchInputElement() {
        return angular.element(document[0].querySelector('input.ion-autocomplete-search'))
    }

    /**
     * Gets the angular element for the autocomplete cancel button
     * @returns {*} the cancel button
     */
    function getCancelButtonElement() {
        return angular.element(document[0].querySelector('button'))
    }

});
