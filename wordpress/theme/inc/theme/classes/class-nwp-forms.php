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

	/**
	 * Get GET variable
	 *
	 * @param string $var
	 * @param boolean $default
	 * @param boolean $empty
	 * @param string $filter
	 * @return string Variable content
	 */
	public static function get_get_var( $var, $default = false, $empty = false, $filter = HTML_SPECIALCHARS ) {

		if ( isset( $_GET[ $var ] ) ) {
			if ( 'ARRAY' === $filter && ! empty( $_GET[ $var ] ) ) {
				$get_var = $_GET[ $var ];
			} elseif ( strpos( $filter, 'VALIDATE' ) !== false && ! empty( $_GET[ $var ] ) ) {
				$get_var = filter_var( $_GET[ $var ], $filter );
			} else {
				$get_var = htmlspecialchars( $_GET[ $var ] );
			}
		} elseif ( empty( $_GET[ $var ] ) ) {
			$get_var = $empty;
		} else {
			$get_var = $default;
		}

		return $get_var;
	}

	/**
	 * Get POST variable
	 *
	 * @param string $var
	 * @param boolean $default
	 * @param boolean $empty
	 * @param string $filter
	 * @return string Variable content
	 */
	public static function get_post_var( $var, $default = false, $empty = false, $filter = HTML_SPECIALCHARS ) {

		if ( isset( $_POST[ $var ] ) ) {
			if ( 'ARRAY' === $filter && ! empty( $_GET[ $var ] ) ) {
				$post_var = $_POST[ $var ];
			} elseif ( strpos( $filter, 'VALIDATE' ) !== false && ! empty( $_POST[ $var ] ) ) {
				$post_var = filter_var( $_POST[ $var ], $filter );
			} else {
				$post_var = htmlspecialchars( $_POST[ $var ] );
			}
		} elseif ( empty( $_POST[ $var ] ) ) {
			$post_var = $empty;
		} else {
			$post_var = $default;
		}

		return $post_var;
	}

	/**
	 * Check if POST was initiated
	 *
	 * @return void
	 */
	public function check_for_post() {
		// Form type
		$form_type = $this->get_post_var( 'form_type' );
		$anti_spam = $this->get_post_var( 'email_v', true, false );
		// If anti-span is empty
		if ( ! $anti_spam ) {
			// Check form type
			switch ( $form_type ) {
				case 'contact_request':
					// Vars
					$request_option  = $this->get_post_var( 'request_option' );
					$request_details = $this->get_post_var( 'request_details' );
					$request_message = $this->get_post_var( 'request_message' );

					if ( $request_details ) {
						$result = $this->request_form( $request_option, $request_details, $request_message );

						if ( true === $result ) {
							echo json_encode(
								array(
									'result' => 'success',
									'msg'    => __( 'Trimis cu succes', 'migro' ),
								)
							);
						} else {
							echo json_encode(
								array(
									'result' => 'error',
									'msg'    => __( 'A apărut o problemă', 'migro' ),
								)
							);
						}
						exit;
					} else {
						echo '{"result":"error","message":"Required fields not sent."}';
						exit;
					}
					break;
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
						$result = $this->contact_form( compact( 'contact_email', 'contact_name', 'contact_message' ) );

						if ( true === $result ) {
							echo '{"result":"success","message":"Your message was sent."}';
						} else {
							echo '{"result":"error","message":"An error has occured."}';
						}
						exit;
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

	/**
	 * Contact form
	 *
	 * @param array $form_data
	 * @return boolean Submit result
	 */
	public function hubspot_form( $form_data ) {
		// phpcs:disable WordPress.PHP.DontExtract.extract_extract
		extract( $form_data );

		$cookie               = '';
		$property_id          = '';
		$form_id              = '';
		$form_url             = '';
		$form_title           = 'Hubspot';
		$subscription_type_id = '';

		$url = "https://api.hsforms.com/submissions/v3/integration/submit/{$property_id}/{$form_id}";

		$data = array(
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

	/**
	 * Mailchimp subscription
	 *
	 * @param array $merge_fields
	 * @param string $email
	 * @return object JSON result
	 */
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

	/**
	 * Contact form
	 *
	 * @param array ...$params
	 * @return boolean Mail result
	 */
	public function contact_form( $params ) {
		extract( $params );

		// Set subject
		$mail_subject = 'New contact request from ' . $contact_name;
		// Set to the defined address in ACF Generated Options
		$mail_to = get_field( 'email', 'options' );
		// Set to the default blog name
		$mail_to_name = get_field( 'name', 'options' );
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
	/**
	 * Request form
	 *
	 * @param string $request_option
	 * @param string $request_details
	 * @param string $request_message
	 * @return boolean Request result
	 */
	public function request_form( $request_option, $request_details, $request_message ) {

		$request_message = ( $request_message ) ? "Here is what it says: \n" . $request_message : '';

		// Set subject
		$mail_subject = 'New contact request from the website';
		// Set to the defined address in ACF Generated Options
		$mail_to = get_field( 'email', 'options' );
		// Set to the default blog name
		$mail_to_name = get_field( 'name', 'options' );
		// Generate from address
		$mail_headers = "From: {$mail_to_name} <{$mail_to}>";
		// Generate body
		$mail_body = "
			Hello,

			You have a new request from one of your website visitors.

			$request_option: $request_details

			$request_message

			This request has also been registered in the intranet.

			Have a nice day!
			$mail_to_name
		";

		// Also send it via WP Mailer
		$mail = wp_mail( $mail_to, $mail_subject, $mail_body, $mail_headers );
		return $mail;
	}
}
