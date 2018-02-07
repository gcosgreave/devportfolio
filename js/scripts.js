/*!
    Title: Dev Portfolio Template
    Version: 1.2.1
    Last Change: 08/27/2017
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Toggle mobile menu
    $('.burger-menu-container').click(function() {
        console.log('------------------------------------');
        console.log($('header'));
        console.log('------------------------------------');
        $(this).toggleClass('active');
        $('header').toggleClass('active');
    });

    // Close mobile menu
    // $('#mobile-menu-close').click(function() {
    //     $('header, body').removeClass('active');
    // });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

    // Get code school badges 

    $.get("http://www.codeschool.com/users/gcosgreave.json", function(data){
        var completedCourses = data.courses.completed;
        var inProgress = data.courses.in_progress;
        // console.log(inProgress);
        
        for(var i = 0; i < completedCourses.length; i++){
            var completedCourseBadge = completedCourses[i].badge;
            // console.log(completedCourses[i].badge);
            $('<li />').addClass('course').appendTo('.courses-completed').css('background-image', 'url(' + completedCourseBadge + ')')
        }
        
        for (var i = 0; i < inProgress.length; i++) {
            var inProgressCourseBadge = inProgress[i].badge;
            // console.log('------------------------------------');
            // console.log(inProgress);
            // console.log('------------------------------------');
            
            $('<li />').addClass('course').appendTo('.courses-progress').css('background-image', 'url(' + inProgressCourseBadge + ')')
        }
    });



})(jQuery);
