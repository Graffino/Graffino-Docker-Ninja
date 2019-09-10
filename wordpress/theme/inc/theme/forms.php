<?php
//
// Name: Forms
// Author: Graffino (http://www.graffino.com)
//

// Get GET var
function get_get_var( $var, $default = false, $empty = false, $filter = FILTER_SANITIZE_STRING ) {

	if ( isset( $_GET[ $var ] ) && ! empty( $_GET[ $var ] ) ) {
		$get_var = filter_var( $_GET[ $var ], $filter );
	} elseif ( empty( $_GET[ $var ] ) ) {
		$get_var = $empty;
	} else {
		$get_var = $default;
	}

	return $get_var;
}

// Get POST var
function get_post_var( $var, $default = false, $empty = false, $filter = FILTER_SANITIZE_STRING ) {

	if ( isset( $_POST[ $var ] ) ) {
		if ( 'ARRAY' == $filter ) {
			$post_var = $_POST[ $var ];
		} else {
			$post_var = filter_var( $_POST[ $var ], $filter );
		}
	} elseif ( empty( $_POST[ $var ] ) ) {
		$post_var = $empty;
	} else {
		$post_var = $default;
	}

	return $post_var;
}

// Check for post
add_action( 'init', 'check_for_post' );
function check_for_post() {
	// Form type
	$form_type = get_post_var( 'form_type' );
	$anti_spam = get_post_var( 'email_v', true, false );

	// If anti-span is empty
	if ( ! $anti_spam ) {
		// Check form type
		switch ( $form_type ) {
			case 'contact':
				// Vars
				$contact_name    = get_post_var( 'contact_name' );
				$contact_email   = get_post_var( 'contact_email', false, false, FILTER_VALIDATE_EMAIL );
				$contact_message = get_post_var( 'contact_message' );

				if ( $contact_name && $contact_email && $contact_message ) {
					$result = contact_form( compact( $contact_email, $contact_name, $contact_message ) );

					if ( 1 == $result ) {
						echo '{"result":"success","msg":"Mesajul dvs. a fost trimis."}';
					} else {
						echo '{"result":"error","msg":"A aparut o eroare. Ne cerem scuze."}';
					}
					die();
				} else {
					//This should never fire for JS enabled browers.
					echo 'Please complete all contact fields.';
					exit;
				}
				break;
			case 'mailchimp':
				// Vars
				$action = get_post_var( 'mailchimp_action' );
				$email  = get_post_var( 'mailchimp_email', false, false, FILTER_VALIDATE_EMAIL );

				if ( $action && $email ) {
					$result = mailchimp_form( $action, $email );
					echo $result;
					die();
				} else {
					wp_die( 'Please submit required fields.' );
				}
				break;
		}
	} else {
		echo 'Anti-spam triggered.';
		exit;
	}
}

// Contact form
function contact_form( ...$params ) {
	extract( $params[0] );

	// Set subject
	$mail_subject = 'New contact request from ' . $contact_name;
	// Set to the defined address in ACF Generated Options
	$mail_to = get_field( 'email', 'options' );
	// Set to the default blog name
	$mail_to_name = get_field( 'name', 'options' );
	// Store sender IP
	$mail_ip = $_SERVER['REMOTE_ADDR'];
	// Generate from address
	$mail_headers = "From: {$contact_name} <{$contact_email}>";
	// Generate body
	$mail_body = <<<EOT
Hello,

$contact_name sent a message via {$mail_to_name} website.

Name: {$contact_name}
E-mail: {$contact_email}

Message:
{$contact_message}

Have a nice day!
$mail_to_name.

EOT;
	// Send it via WP Mailer
	return wp_mail( $mail_to, $mail_subject, $mail_body, $mail_headers );
}

// Mailchimp form
function mailchimp_form( $action, $email ) {
	// Generate URL
	$url = urldecode( $action );
	$url = $url . '&EMAIL=' . urlencode( $email ) . '&amp;c=?';

	//  Initiate curl
	$ch = curl_init();
	// Disable SSL verification
	curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
	// Will return the response, if false it print the response
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	// Set the url
	curl_setopt( $ch, CURLOPT_URL, $url );
	// Execute
	$result = curl_exec( $ch );
	// Closing
	curl_close( $ch );

	return $result;
}
