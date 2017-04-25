<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0"/>
    <title><?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

    <div id="loading-screen" class="fixed fill-container animated" >
        <img src="<?php echo get_template_directory_uri(); ?>/img/loading/loading.png" onload="initLoading(this)" style="display: none">
        <canvas id="loading-canvas" width="400" height="400"></canvas>
        <p>Loading...</p>
    </div>

    <section class="canvas-container section-active">
        <canvas id="background-animation">
        </canvas>
    </section>

    <div class="values-gradient fixed fill-container transparent"></div>

    <div class="mobile-nav">
        <header>
            <div class="animated header-wraper">
                <div class="logo__wraper">
                    <div class="logo">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/logo.png">
                    </div>
                    <span class="logo__label">Ocarina studios</span>
                </div>
                <nav class="main-nav">
                    <div id="menu-burger" class="main-nav__burger">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/header-nav/burger-menu.png">
                    </div>
                    <div class="main-nav__menu">
                        <div class="main-nav__menu__item"><a class="home-link">Home</a></div>
                        <div class="main-nav__menu__item"><a class="about-link">About Us</a></div>
                        <div class="main-nav__menu__item"><a class="record-link">Track Record</a></div>
                        <div class="main-nav__menu__item"><a class="contact-link">Contact</a></div>
                    </div>
                </nav>
            </div>
        </header>
        <div id="menu-collapsed" class="menu-collapsed animated">
            <div class="menu-collapsed__item home-link"><a class="home-link">Home</a></div>
            <div class="menu-collapsed__item about-link"><a class="about-link">About Us</a></div>
            <div class="menu-collapsed__item record-link"><a class="record-link">Track Record</a></div>
            <div class="menu-collapsed__item contact-link"><a class="contact-link">Contact</a></div>
            <div class="menu-collapsed__close-button" onclick="toggleMenu()">
                <img src="<?php echo get_template_directory_uri(); ?>/img/header-nav/menu-collapsed-x.png">
            </div>
        </div>
    </div>

    <section id="start-section" class="absolute fill-container  section-active">
        <div class="animated-content content__container section-active">

            <div class="desctop-nav">

                <header class="animated">
                    <div class="header-wraper">
                        <div class="logo__wraper">
                            <div class="logo">
                                <img src="<?php echo get_template_directory_uri(); ?>/img/logo.png">
                            </div>
                            <span class="logo__label">Ocarina studios</span>
                        </div>
                        <nav class="main-nav">
                            <div id="menu-burger" class="main-nav__burger">
                                <img src="<?php echo get_template_directory_uri(); ?>/img/header-nav/burger-menu.png">
                            </div>
                            <div class="main-nav__menu">
                                <div class="main-nav__menu__item"><a class="home-link">Home</a></div>
                                <div class="main-nav__menu__item"><a class="about-link">About Us</a></div>
                                <div class="main-nav__menu__item"><a class="record-link">Track Record</a></div>
                                <div class="main-nav__menu__item"><a class="contact-link">Contact</a></div>
                            </div>
                        </nav>
                    </div>
                </header>

                <div id="menu-collapsed" class="menu-collapsed animated">
                    <div class="menu-collapsed__item"><a class="home-link">Home</a></div>
                    <div class="menu-collapsed__item"><a class="about-link">About Us</a></div>
                    <div class="menu-collapsed__item"><a class="record-link">Track Record</a></div>
                    <div class="menu-collapsed__item"><a class="contact-link">Contact</a></div>
                    <div class="menu-collapsed__close-button" onclick="toggleMenu()">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/header-nav/menu-collapsed-x.png">
                    </div>
                </div>

            </div>

            <div class="circles-container">
                <img class="img-circles circle-1 animated" src="<?php echo get_template_directory_uri(); ?>/img/icons/circles.png">
                <img class="img-circles circle-2 animated" src="<?php echo get_template_directory_uri(); ?>/img/icons/circles.png">
                <img class="img-circles circle-3 animated" src="<?php echo get_template_directory_uri(); ?>/img/icons/circles.png">
                <img class="img-circles circle-4 animated" src="<?php echo get_template_directory_uri(); ?>/img/icons/circles.png">
                <img class="img-circles circle-5 animated" src="<?php echo get_template_directory_uri(); ?>/img/icons/circles.png">
                <img class="img-circles circle-6 animated" src="<?php echo get_template_directory_uri(); ?>/img/icons/circles.png">
                <img class="img-circles circle-7 animated" src="<?php echo get_template_directory_uri(); ?>/img/icons/circles.png">
                <img class="img-circles circle-8 animated" src="<?php echo get_template_directory_uri(); ?>/img/icons/circles.png">
            </div>

            <div>
                <div class="icon physics animated">
                    <canvas id="physics-canvas" width="600" height="600">
                        <img class="icon physics animated" src="<?php echo get_template_directory_uri(); ?>/img/icons/physics.png">
                    </canvas>
                    <canvas id="physics-canvas-2" width="600" height="600">
                        <img class="icon physics animated" src="<?php echo get_template_directory_uri(); ?>/img/icons/physics.png">
                    </canvas>
                </div>
                <div class="icon paintbrush animated" >
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icons/paintbrush.png">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icons/paintbrush.png">
                </div>
                <div class="icon book animated">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icons/book.png">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icons/book.png">
                </div >
                <div class="icon test-tube animated">
                    <canvas id="test-tube-canvas" width="600" height="600">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/icons/test-tube.png">
                    </canvas>
                    <canvas id="test-tube-canvas-2" width="600" height="600">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/icons/test-tube.png">
                    </canvas>
                </div>
            </div>

            <div id="home-content" class="content">
                <h1 class="animated">LEARNING GAMES</h1>
                <p class="animated">Ocarina Studios develops engaging and imagination-stirring apps, specially designed to match the current needs of K12 learners and their educators.</p>
                <div id="contact-us-button" class="contact-us-button animated"><span class="contact-us-button__label">Contact Us</span></div>
            </div>

            <div>
                <div class="icon compass animated">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icons/compass.png">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icons/compass.png">
                </div>
                <div  class="icon plant animated">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icons/plant.png">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icons/plant.png">
                </div>

                <div class="icon telescope animated" >
                    <canvas id="telescope-canvas" width="600" height="600">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/icons/telescope.png">
                    </canvas>
                    <canvas id="telescope-canvas-2" width="600" height="600">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/icons/telescope.png">
                    </canvas>
                </div>
                <div class="icon abacus animated ">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icons/abacus.png">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icons/abacus.png">
                </div>
                <div class="icon computer animated">
                    <canvas id="computer-canvas"  width="600" height="600">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/icons/computer.png">
                    </canvas>
                    <canvas id="computer-canvas-2" width="600" height="600">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/icons/computer.png">
                    </canvas>
                </div>
            </div>

        </div>
        <?php
        $flag = 0;
        wp_reset_postdata();
        $post_args = array(
            'category' => 2
        );
        $posts = get_posts($post_args);
        foreach ($posts as $post) : setup_postdata( $post ); ?>
            <div class="absolute fill-container animated-content values">
                <div class="container">
                    <h3 class="animated">&#x25CF; OUR VALUES</h3>
                    <h2 class="animated"><?php the_title(); ?></h2>
                    <div class="animated">
                        <?php the_content(); ?>
                    </div>
                    <div class="animated thumbnail">
                        <?php the_post_thumbnail('square') ?>
                        <img class="thumbnail-gradient" src="<?php echo get_template_directory_uri(); ?>/img/gradientForThumbnails.png">
                    </div>
                </div>
            </div>
            <?php
        endforeach;
        ?>
        <div  id="resources" class="absolute fill-container animated-content">

            <div class="container">
                <h2 class="animated">Tools and platforms</h2>
                <p class="animated">Here are some of the toolsets and technologies we use to deliver our learning game and apps:</p>
                <div class="animated resources">
                    <div class="xs-50">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/resources/LOGO_001.png">
                    </div>
                    <div class="xs-50">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/resources/LOGO_002.png">
                    </div>
                    <div class="xs-50">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/resources/LOGO_003.png">
                    </div>
                    <div class="xs-50">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/resources/LOGO_004.png">
                    </div>
                    <div class="xs-50">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/resources/LOGO_005.png">
                    </div>
                    <div class="xs-50">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/resources/LOGO_006.png">
                    </div>
                    <div class="xs-50">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/resources/LOGO_007.png">
                    </div>
                    <div class="xs-50">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/resources/LOGO_008.png">
                    </div>
                    <div class="xs-50">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/resources/LOGO_009.png">
                    </div>
                    <div class="xs-50">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/resources/LOGO_010.png">
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="animated social-media">
                    <div class="social-media__title">
                        Follow us on
                    </div>
                    <div class="social-media__icons">
                        <a target="_blank" href="https://www.facebook.com/ocarinastudios"><img src="<?php echo get_template_directory_uri(); ?>/img/social/facebbok.png"></a>
                        <a target="_blank" href="https://twitter.com/ocalearn"><img src="<?php echo get_template_directory_uri(); ?>/img/social/tweeter.png"></a>
                    </div>
                </div>
            </div>

        </div>

        <div class="to-top">
            <img src="<?php echo get_template_directory_uri(); ?>/img/to-top.png">
        </div>
    </section>

    <section id="about-us" class="absolute subpage">

        <div class="about-us">
            <div class="about-us-headings">
                <h2>&#x25CF; ABOUT US</h2>
                <h1 id="who-we-are" class="active">Who We Are</h1>
                <h1 id="our-precess" class="inactive">Our Process</h1>
            </div>
            <div class="about-us-content-container">
                <div id="who-we-are-content" class="about-us-content active">
                    <div class="column-30">
                        <p>Ocarina Studio Ltd was formed in 2015 through a partnership between an games industry experienced &nbsp;creative director, an entrepreneur and an associated group of partners from games and educational content publishing. Ocarina Studios is a small company driven by an interest in the great freedom that learning can provide for people and a fascination for the various ways education works best for students with different learning styles. Learning through activity was always the way that made most sense
                        </p>
                    </div>
                    <div class="column-30">
                        <p>Ocarina's founders - and now its becoming the adopted 'new' way for many classrooms too. As the company has a games background, it now sees an opportunity to satisfy the needs and curiosities of learners and educators - and have fun and grow whilst doing that.</p>
                        <ul>The team's track record includes development of educational projects for these publishers:
                            <li>Marshall Cavendish</li>
                            <li>Research Machines</li>
                            <li>BBC Imagineering</li>
                            <li>Leapfrog Enterprises</li>
                            <li>McKinsey and Company</li>
                            <li>Phillips Interactive</li>
                        </ul>
                    </div>
                    <div class="column-30">
                        <ul>The technical solutions we can offer our clients includes support for:
                            <li><a target="_blank" href="https://unity3d.com">Unity 3D</a>: game&nbsp;development environment</li>
                            <li>HTML5: game/app development frameworks</li>
                            <li><a target="_blank" href="https://www.knewton.com">Knewton</a>: adaptive learning platform</li>
                            <li><a target="_blank" href="https://www.esparklearning.com">eSpark Learning</a>: educational content system</li>
                            <li><a target="_blank" href="https://www.schoology.com">Schoology</a>&nbsp;&amp; <a target="_blank" href="https://www.edmodo.com">Edmondo</a>: learning management systems</li>
                            <li>Devices: Apple iOS &amp;&nbsp;<span>OSX</span>, Android, Google Chromebook, Windows.</li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </div>
                <div id="our-process-content" class="about-us-content">
                    <div class="column-30">
                        <p>We operate as a one-stop shop for the design and development of learning games and educational apps. Our capabilities span a wide range... everything needed to evaluate opportunities, prototype, do&nbsp;<span>audience tests,&nbsp;</span>design and plan a game development, production work, quality assurance, soft launches, pre-launch marketing. then on to full launch and post-launch updates.</p>
                    </div>
                    <div class="column-30">
                        <ul>We are very familiar with working in partnerships with...
                            <li>Publishing Houses and&nbsp;Writers</li>
                            <li>Educators and&nbsp;<span>Students</span></li>
                            <li>Content Owners</li>
                            <li>Technology companies<span>.</span></li>
                        </ul>
                        <p>&#8203;Creating an effective, satisfying products starts on Day 1. Your business and content experts meet with our designers and engineers to map out the overall process. Our approach emphasizes careful planning and collaboration to save partners time and money. We put the same care into relationships that we put into software. We also put an extreme amount of attention into the title's level of creativity and ability to engage its users.</p>
                    </div>
                    <div class="column-30">
                        <ul>Our procedure in summary (with thanks to those who wrote this material, Muzzy Lane):
                            <li><span>Identify learning objectives</span></li>
                            <li><span>Get the right people around the table</span></li>
                            <li><span>Set proof-of-concept goals</span></li>
                            <li><span>Identify source materials</span></li>
                            <li><span>Study the competition</span></li>
                            <li><span>Listen to key stakeholders</span></li>
                            <li><span>Interview subject matter experts</span></li>
                            <li><span>Brainstorm concepts</span></li>
                            <li><span>Create design documents</span></li>
                            <li><span>Develop and test prototypes</span></li
                            <li><span>Field test. Iterate. Validate.</span></li>
                        </ul>
                    </div>
                    <div class="clear"></div>

                </div>
            </div>
            <p class="about-us-footer">Ocarina Studios is based in London, UK and has its development offices in Krakow Poland.&nbsp;<br />&#8203;Ocarina Studios Ltd is a company registered in England: Company Number 7672629.</p>
        </div>

    </section>

    <section id="track-records" class="absolute subpage">
        <div class="track-records-container">
            <h2>&#x25CF; TRACK RECORD</h2>
            <div id="record-wrap" class="record-wrap">
                <div class="record-wrap-fix">
                    <?php
                    wp_reset_postdata();
                    $post_args = array(
                        'category_name' => 'track-record'
                    );
                    $posts = get_posts($post_args);

                    foreach ($posts as $post) : setup_postdata( $post );
                        ?>

                        <div class="record">
                            <div class="record-img-container">
                                <?php the_post_thumbnail('square') ?>
                                <img class="thumbnail-gradient" src="<?php echo get_template_directory_uri(); ?>/img/gradientForThumbnails.png">
                            </div>
                            <div class="record-content">
                                <h2><?php the_title(); ?></h2>
                                <?php the_excerpt(); ?>
                                <a id="<?php echo $post->ID ?>">
                                    <span class="record-see-more">See more</span>
                                </a>
                            </div>
                            <div class="clear"></div>

                        </div>
                        <?php
                    endforeach;
                    ?>
                </div>
            </div>
        </div>
    </section>

    <section  id="single-record" class="fixed fill-container">

    </section>

    <section id="contact-form" class="fixed fill-container contact-form">

        <div class="contact-form-container">
            <div class="contact-form-wrap">
                <div class="contact-column">
                    <form id="mail-form" method="post" action="mail.php">
                        <div class="form-group">
                            <label for="name">Name: </label>
                            <input type="text" class="form-control" id="name" name="name" >
                        </div>
                        <div class="form-group">
                            <label for="surname">Surname: </label>
                            <input type="text" class="form-control" id="surname" name="surname" >
                        </div>
                        <div class="form-group">
                            <label for="email-id">E-mail: </label>
                            <input type="email" class="form-control" id="email-id" name="email-id">
                        </div>
                        <div class="form-group">
                            <label id="comment" for="message-text">Comment: </label>
                            <textarea rows="3" class="form-control" id="message-text" name="message-text" ></textarea>
                        </div>
                        <button type="submit" class="btn show-xs show-sm" form="mail-form">Send message</button>
                    </form>

                </div>
                <div class="contact-column">
                    <div class="lets-talk content">
                        <h2>Let's Talk!...</h2>
                        <p>We welcome  approaches from  publishers, 'edutech' companies, educational organisations & districts, teachers, students and others too.</p>
                        <button type="submit" class="btn hide-xs hide-sm" form="mail-form">Send message</button>
                        <p class="after-email-thanks hide-xs">Thank you, we will get back to you shortly.</p>
                        <div class="animated social-media">
                            <div class="social-media__title">
                                Follow us on
                            </div>
                            <div class="social-media__icons">
                                <a target="_blank" href="https://www.facebook.com/ocarinastudios"><img src="<?php echo get_template_directory_uri(); ?>/img/social/facebbok.png"></a>
                                <a target="_blank" href="https://twitter.com/ocalearn"><img src="<?php echo get_template_directory_uri(); ?>/img/social/tweeter.png"></a>
                            </div>
                        </div>
                    </div>
                    <p class="after-email-thanks show-xs">Thank you, we will get back to you shortly.</p>
                </div>
                <div class="close-button"><img id="contact-form-close-button" src="<?php echo get_template_directory_uri(); ?>/img/close.png"></div>
            </div>
        </div>

    </section>

    <div class="side-scroll-menu">
        <div class="side-scroll-menu__item">
            <div class="side-scroll-menu__button active" id="button-1"></div>
            <div class="side-scroll-menu__label"><span>Home</span></div>
        </div>
        <?php
        wp_reset_postdata();
        $post_args = array(
            'category' => 2
        );
        $posts = get_posts($post_args);
        for ($i = 1; $i <= sizeof($posts); $i++) { ?>
            <div class="side-scroll-menu__item">
                <div class="side-scroll-menu__button" id="button-<?php echo $i?>"></div>
                <div class="side-scroll-menu__label"><span>Our values</span></div>
            </div>
        <?php }?>
        <div class="side-scroll-menu__item">
            <div class="side-scroll-menu__button" id="button-<?php echo $i?>"></div>
            <div class="side-scroll-menu__label"><span>Tools and platforms</span></div>
        </div>
    </div>

    <?php wp_footer(); ?>

</body>

</html>