<?php
/*
Design by 小智（https://www.yoniu.xyz）
*/
$savename='yoniu';
function d($str){
	$str = str_replace("'","\'",$str );
	return $str;
}
function save_file($name,$value){
    $path=$name.'.php';
    if($value!=''){
        file_put_contents($path,"<?php return ".var_export($value,true).";",LOCK_EX);
    }
}
function read_file($name){
    $path=$name.'.php';
    if(file_exists($path)){
        return include($path);
    }else{
        return false;
    }
}
$check = isset($_GET['check']) ? $_GET['check'] : '';
if($check == 'save') {
	if(empty($_POST)){
		echo json_encode(array('emMsg' => 'error'));//修改失败
		exit;
	}
	if(empty($_POST['navico'])){$navico="glyphicon glyphicon-globe";}else{$navico=isset($_POST['navico']) ? (trim($_POST['navico'])) : '';}//导航图标
	if(empty($_POST['header'])){$header="";}else{$header=isset($_POST['header']) ? (trim($_POST['header'])) : '';}//顶部图片
	$background=isset($_POST['background']) ? (trim($_POST['background'])) : '';//背景图片
	$arr = array('emMsg' => 'success', 'header' => $header, 'background' => $background, 'navico' => $navico);
	save_file($savename,json_encode($arr));
	$json=read_file($savename);
	if($json){
		echo $json;
		exit;
	}else{
		echo json_encode(array('emMsg' => 'error'));//读取数据失败
		exit;
	}
}
if($check=='read'){
	$json=read_file($savename);
	if($json){
		echo $json;
		exit;
	}else{
		echo json_encode(array('emMsg' => 'error'));//读取数据失败
		exit;
	}
}