(function() { 'use strict';

    // Show / hide sections after tapping their titles for mobile devices

    $(window).resize(function () {

        // If we're on a horizontal iPhone or less, activate the show / hide toggling
        // Check that body is the right thing to use - maybe window?
        if ($('body').width() < 568) {

            // Hide all section content by default
            $('.js-section-content').hide();

            // When we click a section title, toggle a sibling with the content class
            $('.js-section-title').click(function () {
                console.log('toggling');
                $(this).siblings('.js-section-content').toggle();
            });

        } else {

            // If we're on anything wider, show everything
            $('.js-section-content').show();

            // ...and disable clicks, as per http://stackoverflow.com/questions/825112/how-to-remove-all-click-event-handlers-in-jquery
            $('.js-section-title').off('click');

        }

    }).resize();

})();
