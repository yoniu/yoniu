<?php
/*
Design by 小智（https://www.yoniu.xyz）
*/
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="<?php $this->options->charset(); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title><?php $this->archiveTitle(array(
            'category'  =>  _t('分类 %s 下的文章'),
            'search'    =>  _t('包含关键字 %s 的文章'),
            'tag'       =>  _t('标签 %s 下的文章'),
            'author'    =>  _t('%s 发布的文章')
        ), '', ' - '); ?><?php $this->options->title(); ?></title>
	<link rel="stylesheet" href="<?php $this->options->themeUrl('css/bootstrap.min.css'); ?>" rel="stylesheet">
	<link rel="stylesheet" href="<?php $this->options->themeUrl('yoniu.css?v1.0'); ?>" rel="stylesheet">
	<link rel='stylesheet' href='<?php $this->options->themeUrl('css/nprogress.css'); ?>'/>
	<script src="<?php $this->options->themeUrl('js/jquery-1.9.1.min.js'); ?>"></script>
	<script src="<?php $this->options->themeUrl('js/bootstrap.min.js'); ?>"></script>
	<script src="<?php $this->options->themeUrl('js/jquery-migrate.min.js'); ?>"></script>
	<?php $this->header(); ?>
</head>
<body>
	<nav class="navbar navbar-default">
		<div class="container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="<?php $this->options ->siteUrl(); ?>"><span id="navicospan" class="glyphicon glyphicon-globe" aria-hidden="true"></span><?php $this->options->title() ?></a>
			</div>
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
                    <li><a href="<?php $this->options->siteUrl(); ?>"><?php _e('首页'); ?></a></li>
                    <?php $this->widget('Widget_Contents_Page_List')->to($pages); ?>
                    <?php while($pages->next()): ?>
                    <li><a href="<?php $pages->permalink(); ?>" title="<?php $pages->title(); ?>"><?php $pages->title(); ?></a></li>
                    <?php endwhile; ?>
				</ul>
			</div><!-- /.navbar-collapse -->
		</div><!-- /.container-fluid -->
	</nav>
<div class="container">
<div id="wrap">
	<div class="header-img">
		<div class="bloggerinfoimg">
			<img class="img-circle img-thumbnail" src="<?php echo getGravatar(strtolower($this->author->mail),128); ?>" width="128px" height="128px" alt="blogger" />
			<h3><?php $this->options->title() ?></h3>
			<span class="des"><?php $this->options->description() ?></span>
		</div>
	</div>
	<div class="sort-nav">
		<div class="row">
		<?php if($this->user->hasLogin() && get_object_vars ($this->user)['row']['group']=="administrator"){ ?>
			<div class="col-xs-4"><h4><a href="<?php $this->options ->siteUrl(); ?>admin/write-post.php">发布文章</span></a></h4></div>
			<div class="col-xs-4"><h4><a href="<?php $this->options ->siteUrl(); ?>admin">后台管理</span></a></h4></div>
			<div class="col-xs-4"><h4><a id="yoniu_setting" href="" data-toggle="modal" data-target="#setting">模板设置</a></h4></div>
			<div class="modal fade" id="setting" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="myModalLabel">模板设置</h4>
						</div>
						<div class="modal-body">
							<div class="input-group youyou">
								<label for="navico" class="input-group-addon">导航图标</label>
								<input type="text" id="navico" class="form-control" name="navico" value="" tabindex="1">
							</div>
								<samp>顶部导航条博客名称前的图标代码，格式（glyphicon glyphicon-globe）<br /><a href="https://v3.bootcss.com/components/#glyphicons">《Glyphicons 字体图标》</a><br /></samp>
							<div class="input-group youyou">
								<label for="header" class="input-group-addon">顶部图片</label>
								<input type="text" id="header" class="form-control" name="header" value="" tabindex="2">
							</div>
								<samp>顶部图片格式：<?php $this->options ->themeUrl(); ?>images/header.jpg<br /></samp>
							<div class="input-group youyou">
								<label for="background" class="input-group-addon">背景图片</label>
								<input type="text" id="background" class="form-control" name="background" value="" tabindex="3">
							</div>
								<samp>背景图片一般不设置，格式与顶部图片格式相同<br /></samp>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
							<button id="save_setting" type="button" class="btn btn-primary">保存设置</button>
						</div>
					</div>
				</div>
			</div>
<script>
$(document).ready(function(){
	$("#yoniu_setting").click(function(){
		$.getJSON("<?php $this->options->themeUrl(); ?>setting.php?check=read",function(json){
			if(json.emMsg=="success"){
				$("#navico").val(json.navico);
				$("#header").val(json.header);
				$("#background").val(json.background);
			}else{
				$(".modal-body").append("<div class='alert alert-danger' role='alert'>加载失败（或配置文件不存在，第一次使用模板忽略）</div>");
			}
		});
	});
	$("#save_setting").click(function(){
		$.post("<?php $this->options->themeUrl(); ?>setting.php?check=save",
		{
			navico:$("#navico").val(),
			header:$("#header").val(),
			background:$("#background").val()
		},
		function(data,status){
			if(status=="success"){
				obj = JSON.parse(data);
				if(obj.emMsg=="success"){
					$(".modal-body").append("<div class='alert alert-success' role='alert'>保存完成</div>");
				}else{
					$(".modal-body").append("<div class='alert alert-danger' role='alert'>保存失败</div>");
				}
			}else{$(".modal-body").append("<div class='alert alert-danger' role='alert'>保存失败</div>");}
		});
	});
});
</script>
		<?php }else{ ?>
			<?php Typecho_Widget::widget('Widget_Stat')->to($stat); ?>
			<div class="col-xs-4"><h4>文章<span class="label label-info"><?php $stat->publishedPostsNum() ?></span></h4></div>
			<div class="col-xs-4"><h4>分类<span class="label label-success"><?php $stat->categoriesNum() ?></span></h4></div>
			<div class="col-xs-4"><h4>评论<span class="label label-warning"><?php $stat->publishedCommentsNum() ?></span></h4></div>
		<?php } ?>
		</div>
	</div>