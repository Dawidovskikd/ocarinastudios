<?php
/**
 * Hide admin bar
 */

add_filter('show_admin_bar', '__return_false');

function add_supports(){
//    add_theme_support( 'post-formats', array( 'aside', 'gallery' ) );
    add_theme_support('post-thumbnails');
    add_image_size('square' , 200 , 200 , true );
}
add_action('after_setup_theme' , 'add_supports');

function resources(){
    wp_enqueue_style( 'style', get_template_directory_uri().'/style.css' );
    wp_enqueue_style( 'animate', get_template_directory_uri().'/css/animate.css');
    wp_enqueue_style( 'mCustomScrollbar', get_template_directory_uri().'/css/jquery.mCustomScrollbar.css');
    wp_enqueue_style( 'slick', get_template_directory_uri().'/css/slick.css' );
    wp_enqueue_style( 'slickTheme', get_template_directory_uri().'/css/slick-theme.css' );
    wp_enqueue_script( 'jquery-2.2.3', get_template_directory_uri().'/js/jquery-2.2.3.min.js' );
////    if(is_front_page()){
        wp_enqueue_script( 'jquery.mCustomScrollbar', get_template_directory_uri().'/js/jquery.mCustomScrollbar.concat.min.js' );
        wp_enqueue_script( 'backgroundAnimation' , get_template_directory_uri().'/js/backgroundAnimation.js');
        wp_enqueue_script( 'contentScrolling' , get_template_directory_uri().'/js/contentScrolling.js' );
        wp_enqueue_script( 'contentLoad' , get_template_directory_uri().'/js/contentLoad.js' );
        wp_enqueue_script( 'resize' , get_template_directory_uri().'/js/resize.js');
        wp_enqueue_script( 'iconInteraction' , get_template_directory_uri().'/js/iconInteraction.js');
        wp_enqueue_script( 'js' , get_template_directory_uri().'/js/js.js');
        wp_enqueue_script( 'mail' , get_template_directory_uri().'/js/mail.js');
////    }
    wp_enqueue_script( 'singlePost' , get_template_directory_uri().'/js/singlePost.js');
}
add_action( 'wp_enqueue_scripts', 'resources' );

function register_my_menus() {
    register_nav_menus(
        array(
            'header-menu' => __( 'Header Menu' ),
            'footer-menu' => __( 'Footer Menu' )
        )
    );
}

add_action( 'init', 'register_my_menus' );



