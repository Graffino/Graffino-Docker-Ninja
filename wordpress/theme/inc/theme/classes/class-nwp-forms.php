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


	public function check_for_post() {
		// Form type
		$form_type = $this->get_post_var( 'form_type' );
		$anti_spam = $this->get_post_var( 'email_v', true, false );

		// If anti-span is empty
		if ( ! $anti_spam ) {
			// Check form type
			switch ( $form_type ) {
				case 'calculator':
					// Vars
					$calculator_country   = $this->get_post_var( 'calculator_country' );
					$calculator_salary    = $this->get_post_var( 'calculator_salary' );
					$calculator_currency  = $this->get_post_var( 'calculator_currency' );
					$calculator_name      = $this->get_post_var( 'calculator_name' );
					$calculator_title     = $this->get_post_var( 'calculator_title' );
					$calculator_company   = $this->get_post_var( 'calculator_company' );
					$calculator_email     = $this->get_post_var( 'calculator_email', false, false, FILTER_VALIDATE_EMAIL );
					$calculator_staff     = $this->get_post_var( 'calculator_staff' );
					$calculator_sick      = $this->get_post_var( 'calculator_sickness' );
					$calculator_employees = $this->get_post_Var( 'calculator_employees' );
					$survey1              = $this->get_post_var( 'defined_roles_percent' );
					$survey2              = $this->get_post_var( 'collaboration_percent' );
					$survey3              = $this->get_post_var( 'customer_facing_percent' );
					$survey4              = $this->get_post_var( 'remote_working_percent' );
					$result_savings       = $this->get_post_var( 'roi_calculator_savings' );
					$result_costs         = $this->get_post_var( 'roi_calculator_costs' );
					$result_roi           = $this->get_post_var( 'roi_calculator_roi' );
					$result_productivity  = $this->get_post_var( 'roi_calculator_productivity' );
					$result_sickness      = $this->get_post_var( 'roi_calculator_sickness' );
					$result_retention     = $this->get_post_var( 'roi_calculator_retention' );
					$calculator_results   = [
						$result_savings,
						$result_costs,
						$result_roi,
						$result_productivity,
						$result_sickness,
						$result_retention,
					];

					$answers = [
						$survey1,
						$survey2,
						$survey3,
						$survey4,
					];

					$form_data = [
						'calculator_country'   => $calculator_country,
						'calculator_salary'    => $calculator_salary,
						'calculator_currency'  => $calculator_currency,
						'calculator_name'      => $calculator_name,
						'calculator_email'     => $calculator_email,
						'calculator_company'   => $calculator_company,
						'calculator_title'     => $calculator_title,
						'answers'              => $answers,
						'calculator_staff'     => $calculator_staff,
						'calculator_sick'      => $calculator_sick,
						'calculator_employees' => $calculator_employees,
						'calculator_results'   => $calculator_results,
					];

					if ( $calculator_name && $calculator_email && $calculator_company && $calculator_title ) {
						// Send data
						if ( $this->calculator_form( $form_data ) ) {
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
					$merge_fields = [
						'LNAME' => $name,
					];
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
			}
		} else {
			echo '{"result":"error","message":"Spam detected."}';
			exit;
		}
	}

	// Contact form
	public function calculator_form( $form_data ) {
		// phpcs:disable WordPress.PHP.DontExtract.extract_extract
		extract( $form_data );

		$timestamp = round( microtime( true ) * 1000 );

		$cookie               = '51057972c9d39f6444ba83eaceeb0470';
		$property_id          = '5478872';
		$form_id              = 'bca6a2cf-ebf9-4208-a730-dd256e88707f';
		$form_url             = 'https://preview.fridaypulse.com/calculator/';
		$form_title           = 'Friday Pulse | Calculator';
		$subscription_type_id = '5919021';

		$url = "https://api.hsforms.com/submissions/v3/integration/submit/{$property_id}/{$form_id}";

		$data = [
			'submittedAt'         => $timestamp,
			'fields'              => [
				[
					'name'  => 'country',
					'value' => $calculator_country,
				],
				[
					'name'  => 'salary',
					'value' => $calculator_salary,
				],
				[
					'name'  => 'currency',
					'value' => $calculator_currency,
				],
				[
					'name'  => 'name',
					'value' => $calculator_name,
				],
				[
					'name'  => 'email',
					'value' => $calculator_email,
				],
				[
					'name'  => 'title',
					'value' => $calculator_title,
				],
				[
					'name'  => 'company',
					'value' => $calculator_company,
				],
				[
					'name'  => 'roi_calculator_costs',
					'value' => $calculator_results[1],
				],
				[
					'name'  => 'roi_calculator_retention',
					'value' => $calculator_results[5],
				],
				[
					'name'  => 'roi_calculator_savings',
					'value' => $calculator_results[0],
				],
				[
					'name'  => 'roi_calculator_sickness',
					'value' => $calculator_results[4],
				],
				[
					'name'  => 'roi_calculator_productivity',
					'value' => $calculator_results[3],
				],
				[
					'name'  => 'roi_calculator_roi',
					'value' => $calculator_results[2],
				],
				[
					'name'  => 'roles_percent',
					'value' => $answers[0],
				],
				[
					'name'  => 'collaboration_percent',
					'value' => $answers[1],
				],
				[
					'name'  => 'customer_facing_percent',
					'value' => $answers[2],
				],
				[
					'name'  => 'remote_working_percent',
					'value' => $answers[3],
				],
				[
					'name'  => 'no_of_employees',
					'value' => $calculator_employees,
				],
				[
					'name'  => 'staff_turnover_percent',
					'value' => $calculator_staff,
				],
				[
					'name'  => 'average_sickness_days',
					'value' => $calculator_sick,
				],
			],
			'context'             => [
				'hutk'     => $cookie,
				'pageUri'  => $form_url,
				'pageName' => $form_title,
			],
			'legalConsentOptions' => [
				'consent' => [
					'consentToProcess' => true,
					'text'             => 'I agree to receive marketing communications from FridayPulse',
					'communications'   => [
						[
							'value'              => true,
							'subscriptionTypeId' => $subscription_type_id,
							'text'               => 'I agree to receive marketing communications from FridayPulse',
						],
					],
				],
			],
		];

		// Initiate curl
		$ch = curl_init();
		// Set the url
		curl_setopt( $ch, CURLOPT_URL, $url );
		curl_setopt( $ch, CURLOPT_HTTPHEADER, [ 'Content-Type: application/json' ] );
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
		// phpcs:disable WordPress.NamingConventions.ValidVariableName.NotSnakeCaseMemberVar
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
		$data = [
			'apikey'        => $api_key,
			'status'        => 'subscribed',
			'email_address' => $email,
			'merge_fields'  => $merge_fields,
		];

		//  Initiate curl
		$ch = curl_init();
		// Set the url
		curl_setopt( $ch, CURLOPT_URL, 'https://' . substr( $api_key, strpos( $api_key, '-' ) + 1 ) . '.api.mailchimp.com/3.0/lists/' . $list_id . '/members/' . md5( strtolower( $data['email_address'] ) ) );
		curl_setopt( $ch, CURLOPT_HTTPHEADER, [ 'Content-Type: application/json', 'Authorization: Basic ' . base64_encode( 'user:' . $api_key ) ] );
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
			[
				'result'  => $status,
				'message' => $message,
			]
		);

		return $response;
	}
}
