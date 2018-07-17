<?php
/*
Design by 小智（https://www.yoniu.xyz）
*/
if (!defined('__TYPECHO_ROOT_DIR__')) exit;

function themeConfig($form) {
    $sidebarBlock = new Typecho_Widget_Helper_Form_Element_Checkbox('sidebarBlock', 
    array(
    'ShowRecentSearch' => _t('显示搜索'),
	'ShowRecentPosts' => _t('显示最新文章'),
    'ShowRecentComments' => _t('显示最近回复'),
    'ShowCategory' => _t('显示分类'),
    'ShowArchive' => _t('显示归档'),),
    array('ShowRecentSearch', 'ShowRecentPosts', 'ShowRecentComments', 'ShowCategory', 'ShowArchive'), _t('侧边栏显示'));
    $form->addInput($sidebarBlock->multiMode());
}
//Yoniu：取Gravatar头像
function getGravatar($email, $s = 40, $d = 'mm', $g = 'g') {
	$hash = md5($email);
	$avatar = "http://www.gravatar.com/avatar/$hash?s=$s&d=$d&r=$g";
	return $avatar;
}
//Yoniu：取文章首图
function GetThumFromContent($content){
	preg_match_all("|<img[^>]+src=\"([^>\"]+)\"?[^>]*>|is", $content->content, $img);
	if($imgsrc = !empty($img[1])){
		 $imgsrc = $img[1][0];}else{ 
			preg_match_all("|<img[^>]+src=\"([^>\"]+)\"?[^>]*>|is", $content->content ,$img);
			if($imgsrc = !empty($img[1])){ $imgsrc = $img[1][0];  }else{
				$imgsrc = "";	
			}
	}
	return $imgsrc;
}
//Yoniu：取纯文本摘要
function extractHtmlData($data, $len) {
	$data = strip_tags(subString($data, 0, $len + 30));
	$search = array("/([\r\n])[\s]+/", // 去掉空白字符
		"/&(quot|#34);/i", // 替换 HTML 实体
		"/&(amp|#38);/i",
		"/&(lt|#60);/i",
		"/&(gt|#62);/i",
		"/&(nbsp|#160);/i",
		"/&(iexcl|#161);/i",
		"/&(cent|#162);/i",
		"/&(pound|#163);/i",
		"/&(copy|#169);/i",
		"/\"/i",
	);
	$replace = array(" ", "\"", "&", " ", " ", "", chr(161), chr(162), chr(163), chr(169), "");
	$data = trim(subString(preg_replace($search, $replace, $data), 0, $len));
	return $data;
}
//截取编码为utf8的字符串
function subString($strings, $start, $length) {
	if (function_exists('mb_substr') && function_exists('mb_strlen')) {
		$sub_str = mb_substr($strings, $start, $length, 'utf8');
		return mb_strlen($sub_str, 'utf8') < mb_strlen($strings, 'utf8') ? $sub_str . '...' : $sub_str;
	}
	$str = substr($strings, $start, $length);
	$char = 0;
	for ($i = 0; $i < strlen($str); $i++) {
		if (ord($str[$i]) >= 128)
			$char++;
	}
	$str2 = substr($strings, $start, $length + 1);
	$str3 = substr($strings, $start, $length + 2);
	if ($char % 3 == 1) {
		if ($length <= strlen($strings)) {
			$str3 = $str3 .= '...';
		}
		return $str3;
	}
	if ($char % 3 == 2) {
		if ($length <= strlen($strings)) {
			$str2 = $str2 .= '...';
		}
		return $str2;
	}
	if ($char % 3 == 0) {
		if ($length <= strlen($strings)) {
			$str = $str .= '...';
		}
		return $str;
	}
}