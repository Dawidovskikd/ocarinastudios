<?php

require_once "mail.php";
require_once("../../../wp-load.php");

$from = 'Ocarina Studios contact form: '
    .((isset($_POST['name']))      ? ( $_POST['name']    .' ')  : '' )
    .((isset($_POST['surname']))   ? ( $_POST['surname'] .' ')  : '' )
    .((isset($_POST['email-id']))  ?   $_POST['email-id']       : '' );

$message = isset($_POST['message-text']) ? $_POST['message-text'] : '';

wp_mail('contact@ocarina-studios.com' , $from , $message );
  

