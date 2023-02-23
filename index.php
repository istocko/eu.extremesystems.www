<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

define('ES_PLATFORM',true);

$ip = $_SERVER['REMOTE_ADDR'];
$ugrid_vpn = "192.168.208.";

if (substr($ip,0,strlen($ugrid_vpn))==$ugrid_vpn){
	echo "You are on UGRID. Welcome";
	define('ON_UGRID',true);
} else
{
	define('ON_UGRID',false);
}

include "index_app1.html";
require_once "es_platform_login.php";
include "index_app2.html";
