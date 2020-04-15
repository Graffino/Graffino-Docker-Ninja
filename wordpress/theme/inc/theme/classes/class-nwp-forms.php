<?php

/**
 * Forms class
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_Forms {
	public function __construct() {
	}

	// Get GET var
	public function get_get_var( $var, $default = false, $empty = false, $filter = FILTER_SANITIZE_STRING ) {

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
	public function get_post_var( $var, $default = false, $empty = false, $filter = FILTER_SANITIZE_STRING ) {

		if ( isset( $_POST[ $var ] ) ) {
			if ( 'ARRAY' === $filter ) {
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


	public function check_for_post() {
		// Form type
		$form_type = $this->get_post_var( 'form_type' );
		$anti_spam = $this->get_post_var( 'email_v', true, false );

		// If anti-span is empty
		if ( ! $anti_spam ) {
			// Check form type
			switch ( $form_type ) {
				case 'hubspot':
					// Vars
					$hubspot_name    = $this->get_post_var( 'hubspot_name' );
					$hubspot_title   = $this->get_post_var( 'hubspot_title' );
					$hubspot_company = $this->get_post_var( 'hubspot_company' );
					$hubspot_email   = $this->get_post_var( 'hubspot_email', false, false, FILTER_VALIDATE_EMAIL );

					$form_data = array(
						'hubspot_name'    => $hubspot_name,
						'hubspot_email'   => $hubspot_email,
						'hubspot_company' => $hubspot_company,
						'hubspot_title'   => $hubspot_title,
					);

					if ( $hubspot_name && $hubspot_email && $hubspot_company && $hubspot_title ) {
						// Send data
						if ( $this->hubspot_form( $form_data ) ) {
							echo '{"result":"success","message":"Your report was sent :)"}';
						} else {
							echo '{"result":"error","message":"Something went wrong :("}';
						}
						exit;
					} else {
						//This should never fire for JS enabled browers.
						echo 'Please complete all contact fields.';
						exit;
					}
					break;
				case 'mailchimp':
					// Vars
					$name         = $this->get_post_var( 'mailchimp_name' );
					$merge_fields = array(
						'LNAME' => $name,
					);
					$email        = $this->get_post_var( 'mailchimp_email', false, false, FILTER_VALIDATE_EMAIL );

					if ( $name && $email ) {
						$result = $this->mailchimp_form( $merge_fields, $email );
						echo $result;
						exit;
					} else {
						echo '{"result":"error","message":"Required fields not sent."}';
						exit;
					}
					break;
				case 'contact':
					// Vars
					$contact_name    = $this->get_post_var( 'contact_name' );
					$contact_email   = $this->get_post_var( 'contact_email', false, false, FILTER_VALIDATE_EMAIL );
					$contact_message = $this->get_post_var( 'contact_message' );

					if ( $contact_name && $contact_email && $contact_message ) {
						$result = $this->contact_form( compact( $contact_email, $contact_name, $contact_message ) );

						if ( 1 === $result ) {
							echo '{"result":"success","msg":"Your message was sent."}';
						} else {
							echo '{"result":"error","msg":"An error has occured."}';
						}
					} else {
						echo '{"result":"error","message":"Required fields not sent."}';
						exit;
					}
					break;
			}
		} else {
			echo '{"result":"error","message":"Spam detected."}';
			exit;
		}
	}

	// Contact form
	public function hubspot_form( $form_data ) {
		// phpcs:disable WordPress.PHP.DontExtract.extract_extract
		extract( $form_data[0] );

		$timestamp = round( microtime( true ) * 1000 );

		$cookie               = '';
		$property_id          = '';
		$form_id              = '';
		$form_url             = '';
		$form_title           = 'Hubspot';
		$subscription_type_id = '';

		$url = "https://api.hsforms.com/submissions/v3/integration/submit/{$property_id}/{$form_id}";

		$data = array(
			'submittedAt'         => $timestamp,
			'fields'              => array(
				array(
					'name'  => 'name',
					'value' => $hubspot_name,
				),
				array(
					'name'  => 'email',
					'value' => $hubspot_email,
				),
				array(
					'name'  => 'title',
					'value' => $hubspot_title,
				),
				array(
					'name'  => 'company',
					'value' => $hubspot_company,
				),
			),
			'context'             => array(
				'hutk'     => $cookie,
				'pageUri'  => $form_url,
				'pageName' => $form_title,
			),
			'legalConsentOptions' => array(
				'consent' => array(
					'consentToProcess' => true,
					'text'             => 'I agree to receive marketing communications.',
					'communications'   => array(
						array(
							'value'              => true,
							'subscriptionTypeId' => $subscription_type_id,
							'text'               => 'I agree to receive marketing communications.',
						),
					),
				),
			),
		);

		// Initiate curl
		$ch = curl_init();
		// Set the url
		curl_setopt( $ch, CURLOPT_URL, $url );
		curl_setopt( $ch, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json' ) );
		curl_setopt( $ch, CURLOPT_USERAGENT, 'PHP-MCAPI/2.0' );
		// Will return the response, if false it print the response
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
		// method PUT
		curl_setopt( $ch, CURLOPT_CUSTOMREQUEST, 'POST' );
		curl_setopt( $ch, CURLOPT_TIMEOUT, 10 );
		curl_setopt( $ch, CURLOPT_POST, true );
		// Disable SSL verification
		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode( $data ) ); // send data in json
		// Execute
		$result = curl_exec( $ch );
		// Closing
		curl_close( $ch );

		$result = json_decode( $result );
		// phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		if ( 'Thanks for submitting the form.' === $result->inlineMessage ) {
			return true;
		} else {
			return false;
		}
	}

	// Mailchimp form
	public function mailchimp_form( $merge_fields, $email ) {
		if ( have_rows( 'mailchimp', 'options' ) ) :
			while ( have_rows( 'mailchimp', 'options' ) ) :
				the_row();
				$api_key = get_sub_field( 'api_key' );
				$list_id = get_sub_field( 'list_id' );
			endwhile;
		endif;
		$data = array(
			'apikey'        => $api_key,
			'status'        => 'subscribed',
			'email_address' => $email,
			'merge_fields'  => $merge_fields,
		);

		//  Initiate curl
		$ch = curl_init();
		// Set the url
		curl_setopt( $ch, CURLOPT_URL, 'https://' . substr( $api_key, strpos( $api_key, '-' ) + 1 ) . '.api.mailchimp.com/3.0/lists/' . $list_id . '/members/' . md5( strtolower( $data['email_address'] ) ) );
		curl_setopt( $ch, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json', 'Authorization: Basic ' . base64_encode( 'user:' . $api_key ) ) );
		curl_setopt( $ch, CURLOPT_USERAGENT, 'PHP-MCAPI/2.0' );
		// Will return the response, if false it print the response
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
		// method PUT
		curl_setopt( $ch, CURLOPT_CUSTOMREQUEST, 'PUT' );
		curl_setopt( $ch, CURLOPT_TIMEOUT, 10 );
		curl_setopt( $ch, CURLOPT_POST, true );
		// Disable SSL verification
		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode( $data ) ); // send data in json
		// Execute
		$result = curl_exec( $ch );
		// Closing
		curl_close( $ch );

		$result = json_decode( $result );

		if ( '400' === $result->status ) {
			$status  = 'error';
			$message = 'Something went wrong. Please try again.';
		} else {
			$status  = 'success';
			$message = 'Thank you!';

		}

		$response = json_encode(
			array(
				'result'  => $status,
				'message' => $message,
			)
		);

		return $response;
	}

	// Contact form
	public function contact_form( ...$params ) {
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
		$mail_body = "
			Hello,

			$contact_name sent a message via {$mail_to_name} website.

			Name: {$contact_name}
			E-mail: {$contact_email}

			Message:
			{$contact_message}

			Have a nice day!
			$mail_to_name.
		";
		// Send it via WP Mailer
		return wp_mail( $mail_to, $mail_subject, $mail_body, $mail_headers );
	}
}
