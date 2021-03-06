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

var gcui = {
    init: function () {
        $('html').removeClass('no-js');
        gcui.header();
        gcui.timeline();
        gcui.menu();
        gcui.projects();
        gcui.getCourses();
    },
    header: function() {
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

    },
    timeline: function() {
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


    },
    menu: function() {

        var menuContainer = $('.burger-menu-container');

        function iterateAddClass(element, classname, index, duration){
            setTimeout(function(){
                element.classList.add(classname);
            }, duration * index);
        }

        $('.menu-item').click(function () {
            if ($(this).hasClass('menu-item--active')) {
                $('header').removeClass('active');
                iterateAddClass(element, 'menu-item--active', index, 150);
            } else {
                $('header').addClass('active');
                iterateAddClass(element, 'menu-item--active', index, 150);
            }
        });

        // Toggle mobile menu
        $(menuContainer).click(function() {
            var menuItems = $('.menu-item');
            $(this).toggleClass('active');
            $('header').toggleClass('active');
            if ($(this).hasClass('active')) {
                $('.menu-item').each(function (index, element) {
                    iterateAddClass(element, 'menu-item--active', index, 150);
                });
            } else {
                $('.menu-item').each(function( index, element ) {
                    $(this).removeClass('menu-item--active')
                });
            }
        });

    },
    projects: function() {
        // Load additional projects
        $('#view-more-projects').click(function(e){
            e.preventDefault();
            $(this).fadeOut(300, function() {
                $('#more-projects').fadeIn(300);
            });
        });
    },
    getCourses: function () {

        var courseURL = "https://www.codeschool.com/users/gcosgreave.json?callback=?";

        $.jsonp({
            url: courseURL,
            dataType: 'jsonp',
            success: getCourseData,
            error: dataFailed,
        });

        function getCourseData (data, status){
            completedCourses(data.courses.completed);
            progressCourses(data.courses.in_progress);
        }

        function dataFailed (){
            $('.course-text').replaceWith("<p>Sorry the courses don't seem to currently be loading.</p>")
        }

        function completedCourses(courses){
            for (var i = 0; i < courses.length; i++){
                var coursesBadge = courses[i].badge;
                var coursesAlt = courses[i].title;
                $('<li />').addClass('course').appendTo('.courses-completed').css('background-image', 'url(' + coursesBadge + ')').attr("alt", coursesAlt).attr("title", coursesAlt)
            }
        }
        function progressCourses(courses){
            for (var i = 0; i < courses.length; i++) {
                var inProgressCourseBadge = courses[i].badge;
                var coursesAlt = courses[i].title;
                $('<li />').addClass('course').appendTo('.courses-progress').css('background-image', 'url(' + inProgressCourseBadge + ')').attr("alt", coursesAlt).attr("title", coursesAlt);
            }
        }
    }

};
