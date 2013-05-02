<?php
	$url = 'http://limitless-journey-1085.herokuapp.com/submit.json';
	$fields = array(
							'game_title' => urlencode('frogger'),
							'score' => urlencode(210),
							'username' => 'sam'
					);
	foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
		rtrim($fields_string, '&');
	$ch = curl_init();

	for ($i = 0; $i < 10000000; $i++) {
		curl_setopt($ch,CURLOPT_URL, $url);
		curl_setopt($ch,CURLOPT_POST, count($fields));
		curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
		curl_exec($ch);
	}

	curl_close($ch);