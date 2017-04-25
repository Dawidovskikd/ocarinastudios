<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');
$response = '';
$ID = $_POST['id'] ;
$the_query = new WP_Query( array(
    'p' => $ID,
    'post_type' => 'any'
));
$content = 'nie działa';
if($the_query->have_posts()){
    $the_query->the_post();
    $content = get_the_content();
} ?>
<div class="content-wrap">
    <div class="featured-image">
        <?php the_post_thumbnail()?>
    </div>
    <div class="post-content">
        <h1><?php the_title() ?></h1>
        <?php the_content()?>
    </div>
</div>
<div class="close-button"><img id="single-record-close-button" src="<?php echo get_template_directory_uri(); ?>/img/close.png"></div>
