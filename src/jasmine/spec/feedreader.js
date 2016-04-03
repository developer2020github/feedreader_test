/*========================================================
Author:  developer2020 
e-mail:  dev276236@gmail.com
//=======================================================*/
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each  feed URL is defined and not empty', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toBeTruthy();
            }
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each  feed name is defined and not empty', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].name).toBeTruthy();
            }
        });

    });


    /* This test suite tests the menu*/
    describe('The Menu', function() {

        /* This test  checks that the menu element is
         * hidden by default. 
         */
        it('menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        /* This test ensures that the menu changes
         * visibility when the menu icon is clicked. It 
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu changes visibility when clicked', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /* This test suite chck  initial entries */
    describe('Initial entries', function() {

        /* this test  ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('Feed container is not empty after initalization', function() {
            var container = $('.feed');
            expect(container.children().length > 0).toBe(true);
        });
    });

    /*This test suite checks that content changes when a new feed is loaded*/
    describe('New Feed Selection', function() {

        var currentContent = Array(); //represents curretn content
        var previousContent = Array(); //content with previous feed
        var currentFeedId = 0; //index of feed loaded at current step 
        var numberOfFeeds = allFeeds.length;

        /* This function reads content currently in the DOM and puts into currentContent array*/
        function loadCurrentContent() {
            currentContent = [];
            var container = $('.feed');
            var childr = container.children();
            for (var i = 0; i < container.children().length; i++) {
                //can define content string differently if needed
                currentContent.push(childr[i].getElementsByTagName('h2')[0].innerText);
            }
        }

        //load initial content once 
        beforeAll(function(done) {

            loadFeed(currentFeedId, function() {
                loadCurrentContent();
                currentFeedId++;
                done();
            });
        });

        //run before each test - load new content into currentContent array
        //and save current content into previous content
        beforeEach(function(done) {
            loadFeed(currentFeedId, function() {
                previousContent = currentContent.slice();
                loadCurrentContent();
                currentFeedId++;
                done();
            });
        });

        //helper function - used to compare previous and current content arrays 
        function allValuesOfArray1FoundInArray2(a1, a2) {
            var allFound = true;
            $.each(a1, function(idx, val) {
                if ($.inArray(val, a2) === -1) {
                    allFound = false;
                    return false;
                }
            });
            return allFound;
        }

        //helper function - used to compare previous and current content arrays 
        function allValuesInArraysMatch(a1, a2) {
            var allMatch = true;
            allMatch = allValuesOfArray1FoundInArray2(a1, a2);
            if (allMatch) {
                allMatch = allValuesOfArray1FoundInArray2(a2, a1);
            }
            return allMatch;
        }

        //main test - loop through list of feeds, reload and see if newly loaded 
        //content differes from previous one
        
        //Linter gives error " Don't make functions within a loop"
        //Since this code does not get released, this is not a big deal.
        //However, moved check function definition out of the loop anyway.
        var checkExpectation = function(){
            expect(allValuesInArraysMatch(previousContent, currentContent)).toBe(false);
        };

        for (var j = 1; j < numberOfFeeds; j++) {
            it('content changes when feed ' + (j + 1).toString() + ' of ' + (numberOfFeeds).toString() + ' is selected', checkExpectation);
        }

    });


}());
