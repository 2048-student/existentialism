$( document ).ready(function() {
    /*TRANSITION CODE -- ADD CLASSES*/
    $('.header, .footer').addClass('visible');
    $('.nav-list li:nth-child(even)').addClass('visible-even');
    $('.nav-list li:nth-child(odd)').addClass('visible-odd');
    $('.section, .subsection').addClass('show-on-scroll');
    $('h1, h2, h3, h4').addClass('show-on-scroll');

    /*DARK MODE SESSION INFO*/
    var isDarkView = localStorage.getItem('dark-view');
    var className = isDarkView ? 'dark-view' : '';
    $('body, html, .dark-mode').addClass(className);

    /*RESPONSIVE NAVBAR CODE*/
    $('.navbar').on('click', function(event) {
        event.preventDefault();
        var x = document.getElementById('nav');
        if (x.className === 'navigation') {
            x.className += ' responsive';
        } else {
            x.className = 'navigation';
        }
        $('.burger').toggleClass('active');
    })

    /*GALLERY CODE*/
    $('.gallery').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 3,
        variableWidth: true,
        responsive: [
        {
            breakpoint: 1440,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                infinite: false,
                dots: true
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        ]
    });

    /*DARK MODE*/
    $('.dark-mode').on('click', function() {
        if(isDarkView) {
            isDarkView = false;
            localStorage.removeItem('dark-view');
            $(this).removeClass('dark-view');
            $('html').removeClass('dark-view');
            $('body').removeClass('dark-view');
        } else {
            isDarkView = true;
            localStorage.setItem('dark-view', true);
            $(this).addClass('dark-view');
            $('html').addClass('dark-view');
            $('body').addClass('dark-view');
        }
    });

    var scroll = window.requestAnimationFrame ||
        function(callback){ window.setTimeout(callback, 1000/60)};
    var elementsToShow = document.querySelectorAll('.show-on-scroll');

    function loop() {
        Array.prototype.forEach.call(elementsToShow, function(element){
          if (isElementInViewport(element)) {
            element.classList.add('is-visible');
          } else {
            element.classList.remove('is-visible');
          }
        });

        scroll(loop);
    }

    loop();

    function isElementInViewport(el) {
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var rect = el.getBoundingClientRect();
        return (
        (rect.top <= 0
          && rect.bottom >= 0)
        ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight))
        ||
        (rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
        );
    }

    $('.btn')
    .on('mouseenter', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
    })
    .on('mouseout', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
    	$(this).find('span').css({top:relY, left:relX})
    });

    new fullScroll({

    // parent container
    mainElement : 'fullpage',

    // content section
    sections : 'section',

    // animation speed
    animateTime : 0.7,

    // easing for animation
    animateFunction : 'ease',

    // current position
    currentPosition: 0,

    // display dots navigation
    displayDots: true,

    // where to place the dots navigation
    dotsPosition: 'right'

});
console.log($('.dots'));
const pageName = $('body').attr('id');
const pages = [
    {
        name:'home',
        sections:['welcome', 'problemone', 'problemtwo']
    },
    {
        name:'problemone',
        sections:['problem one', 'hemingway', 'heidegger', 'sartre', 'guenther', 'sontag', 'stanford prison experiment']
    },
    {
        name:'problemtwo',
        sections:['problem two', 'sartre', 'overbye','pinker', 'kant', 'singer', 'nagel']
    }
];
const page = pages.find(page => page.name === pageName);
$('.dots li a').append(function (index) {
  return $('<span>', {
    text: `${page.sections[index]}`
  })
});
});
