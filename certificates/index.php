<?php

//echo date()+"<br>";

error_reporting(E_ALL);
ini_set('display_errors', 1);


function genType($type_code, $type_str)
{
	$certificate_type = array();
 	$certificate_type['code'] = $type_code;
 	$certificate_type['title'] = $type_str;
 	$certificate_type['certs'] = array();
 	return $certificate_type;
}

function addItem($item_code, $item_str)
{
	
	$cert_item = array();
	$cert_item['code'] = $item_code;
	$cert_item['title'] = $item_str;
	$cert_item['certified'] = array();
	return $cert_item;
}

function addCertified($code, $name, $date, $score)
{
	$certified = array();
	$certified['code'] = $code;
	$certified['name'] = $name;
	$certified['date'] = $date;
	$certified['score'] = $score;
	return $certified;
	
}

$show_certified = false;





$certificate_types = array();
$certificate_type = genType("management", "Management");
$cert_item = addItem('bx8time', 'Bx8 Time');
$certified = addCertified("certified-1","Imrich Stolar", mktime(16, 25, 34, 6, 21, 2011), 96);
$cert_item['certified'][] = $certified;
$certified = addCertified("certified-2","Jan Istocko", mktime(0, 0, 0, 6, 22, 2011), 96);
$cert_item['certified'][] = $certified;
$certificate_type['certs'][]=$cert_item;
$cert_item = addItem('time', 'Time');
$certified = addCertified("certified-1","Imrich Stolar", mktime(16, 25, 34, 6, 21, 2011), 96);
$cert_item['certified'][] = $certified;
$certificate_type['certs'][]=$cert_item;
//var_dump($certificate_type);
//addItem($certificate_type, 'team', 'Team');
//addItem($certificate_type, 'sales', 'Sales');
//addItem($certificate_type, 'finance', 'Finance');
$certificate_types[]=$certificate_type;
$certificate_type = genType("development", "Development");
$cert_item = addItem('windows', 'Windows');
$certified = addCertified("certified-1","Jan Istocko", mktime(0, 0, 0, 10, 10, 1999), 100);
$cert_item['certified'][] = $certified;
$certificate_type['certs'][]=$cert_item;
$cert_item = addItem('web', 'Web');
$certified = addCertified("certified-1","Jan Istocko", mktime(0, 0, 0, 8, 21, 2002), 100);
$cert_item['certified'][] = $certified;
$certified = addCertified("certified-2","Peter Istocko", mktime(0, 0, 0, 4, 15, 2013), 89);
$cert_item['certified'][] = $certified;
$certificate_type['certs'][]=$cert_item;
$cert_item = addItem('php', 'PHP');
$certified = addCertified("certified-1","Jan Istocko", mktime(0, 0, 0, 3, 11, 2005), 100);
$cert_item['certified'][] = $certified;
$certificate_type['certs'][]=$cert_item;
$cert_item = addItem('mysql', 'MySQL');
$certified = addCertified("certified-1","Jan Istocko", mktime(0, 0, 0, 4, 11, 2005), 100);
$cert_item['certified'][] = $certified;
$certificate_type['certs'][]=$cert_item;
$cert_item = addItem('java', 'Java');
$certified = addCertified("certified-1","Jan Istocko", mktime(0, 0, 0, 1, 15, 2006), 100);
$cert_item['certified'][] = $certified;
$certificate_type['certs'][]=$cert_item;
$cert_item = addItem('linux', 'Linux');
$certified = addCertified("certified-1","Jan Istocko", mktime(0, 0, 0, 7, 23, 2003), 100);
$cert_item['certified'][] = $certified;
$certificate_type['certs'][]=$cert_item;

$certificate_types[]=$certificate_type;
$certificate_type = genType("research", "Research");
$cert_item = addItem('3dvr', '3D Virtual Reality');
$certified = addCertified("certified-1","Jan Istocko", mktime(0, 0, 0, 8, 21, 2014), 100);
$cert_item['certified'][] = $certified;
$certificate_type['certs'][]=$cert_item;
$certificate_types[]=$certificate_type;

function imagecenteredstring ( &$img, $font, $xMin, $xMax, $y, $str, $col ) {
    $textWidth = imagefontwidth( $font ) * strlen( $str );
    $xLoc = ( $xMax - $xMin - $textWidth ) / 2 + $xMin + $font;
    imagestring( $img, $font, $xLoc, $y, $str, $col );
}


if (isset($cert) && isset($_GET['type'])&&isset($_GET['item'])&&isset($_GET['certified']))
{
	$show_certified = true;
	$show_certified_type =  $_GET['type'];
	$show_certified_item =  $_GET['item'];
	$show_certified_certified =  $_GET['certified'];
	
	$certificate_type_title = null;
	$certificate_item_title = null;
	
	$type = null;
	foreach ($certificate_types as $cert)
	{
		if ($cert['code'] == $show_certified_type)
		{
			$type = $cert;
			$certificate_type_title = $type['title'];
			break;
		}
	}
	
	if ($type == null)
	{
		die("not found type of certificate!");	
	}
	
	$item = null;
	foreach ($type['certs'] as $cert)
	{
		if ($cert['code'] == $show_certified_item)
		{
			$item = $cert;
			$certificate_item_title = $item['title'];
			break;
		}
	}
	
	if ($item == null)
	{
		die("not found item of certificate!");	
	}
	
	$certified_all = $item['certified'];
	$certified = null;
	foreach ($certified_all as $cert)
	{
		if ($cert['code'] == $show_certified_certified)
		{
			$certified = $cert;			
			break;
		}
	}
	
	if ($certified == null)
	{
		die("not found certified of certificate!");	
	}
	
	$image = imagecreatefrompng('cert_small.png');
	if ($image)
	{
		header('Content-type: image/png');
		$black = imagecolorallocate($image, 76,76,76);
		$width = imagesx($image);
		
		$name = $certified['name'];
		imagecenteredstring($image, 3, 0, $width, 90, $name, $black);
		
		$cert_name = "Certificate in ".$certificate_item_title." ".$certificate_type_title;
		imagecenteredstring($image, 3, 0, $width, 125, $cert_name, $black);
		
		$date = date('d.m.Y', $certified['date']);
		imagecenteredstring($image, 3, 50, $width/4, 145, $date, $black);
		
		$score = $certified['score']."%";
		imagecenteredstring($image, 3, 0, $width, 160, $score, $black);
		
		
		
		imagepng($image);
		imagedestroy($image);
	} else
	{
		echo "not found";
	}
	
} else
if (count($certificate_types)>0)
{
	echo "<p>Certificate types</p>";
	echo "<ul>";
	foreach ($certificate_types as $certificate_type)
	{
		echo "<li><a href=\"?type=".$certificate_type['code']."\">".$certificate_type['title']."</a></li>";
		if ($certificate_type['certs'] != null && count($certificate_type['certs'])>0)
		{
			echo "<ul>";
			foreach ($certificate_type['certs'] as $certificate_item)
			{
				//var_dump($certificate_item);
				echo "<li><a href=\"?type=".$certificate_type['code']."&item=".$certificate_item['code']."\">".$certificate_item['title']."</a>&nbsp;(".($certificate_item['certified'] != null? count($certificate_item['certified']): "0").")</li>";
				if ($certificate_item['certified'] != null && count($certificate_item['certified'])>0)
				{
					echo "<ul>";
					foreach ($certificate_item['certified'] as $certified)
					{
						echo "<li><a href=\"cert.php?type=".$certificate_type['code']."&item=".$certificate_item['code']."&certified=".$certified['code']."\">".$certified['name']."</a>&nbsp;".date('d.m.Y H:i:s',$certified['date'])."</li>";
					}
					echo "</ul>";
				}
			}
			echo "</ul>";
		}
	}
	echo "</ul>";
}


