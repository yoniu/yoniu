<?php
/*
Design by 小智（https://www.yoniu.xyz）
*/
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
function threadedComments($comments, $options) {
?>
	<div class="comment <?php if ($comments->levels > 0) {echo 'comment-children';$comments->levelsAlt(' comment-level-odd', ' comment-level-even');} else {echo 'comment-body';}?>" id="li-<?php $comments->theId(); ?>">
		<div id="<?php $comments->theId(); ?>">
		<div class="author">
			<div class="avatar"><?php $comments->gravatar('40', ''); ?></div>
			<b><?php $comments->author(); ?></b>
			<div class="comment-reply"><?php $comments->reply(); ?></div>
			<div class="comment-time"><?php $comments->date('Y-m-d H:i'); ?></div>
		</div>
		<div class="comment-info">
			<div class="comment-content"><?php echo $comments->content; ?></div>
		</div>
		<?php if ($comments->children) { ?>
			<?php $comments->threadedComments($options); ?>
		<?php } ?>
		</div>
	</div>
<?php
}
?>
<div id="comments">
    <?php if($this->allow('comment')): ?>
	<div class="article-comments" style="margin-top:20px;">
	<?php $this->comments()->to($comments); ?>
	<div class="article-title">评论(<?php $this->commentsNum(_t('0'), _t('1'), _t('%d')); ?>)</div>
	<div id="<?php $this->respondId(); ?>">
	<div id="comment-place">
	<div class="comment-post" id="commentform">
		<p class="comment-header"></p>
		<form method="post" action="<?php $this->commentUrl() ?>" id="comment-form" role="form">
			<textarea name="text" id="textarea" rows="10" tabindex="4" placeholder="听说你的评论可以一针见血"></textarea>
			<div class="comment-btn">
				<div class="cancel-reply" id="cancel-reply"><?php $comments->cancelReply(); ?></div>
				<?php if($this->user->hasLogin()): ?>
				<input type="submit" value="提交评论" tabindex="6"  class="btn btn-primary"/>
				<?php else: ?>
				<button id="putin" type="button" class="btn btn-primary" data-toggle="modal" data-target="#info-box">提交评论</button>
				<?php endif; ?>
			</div>
			<div class="modal fade" id="info-box" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="exampleModalLabel">补充相关信息</h4>
						</div>
						<div class="modal-body">
							<?php if($this->user->hasLogin()): ?>
							<?php else: ?>
								<div class="input-group youyou">
									<label for="author" class="input-group-addon"><?php _e('昵称'); ?></label>
									<input class="form-control" type="text" name="author" id="author" value="<?php $this->remember('author'); ?>" required tabindex="1">
								</div>
								<div class="input-group youyou">
									<label for="email" class="input-group-addon"><?php _e('邮箱'); ?></label>
									<input class="form-control" type="email" name="mail" id="mail" value="<?php $this->remember('mail'); ?>"<?php if ($this->options->commentsRequireMail): ?> required<?php endif; ?> tabindex="2">
								</div>
								<div class="input-group">
									<label for="url" class="input-group-addon"><?php _e('网站'); ?></label>
									<input class="form-control" type="url" name="url" id="url" placeholder="<?php _e('http://'); ?>" value="<?php $this->remember('url'); ?>"<?php if ($this->options->commentsRequireURL): ?> required<?php endif; ?> tabindex="3">
								</div>
							<?php endif; ?>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
							<input type="submit" id="comment_submit" value="完成" tabindex="6"  class="btn btn-primary"/>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
	</div>
	</div>
		<?php if ($comments->have()): ?>
		<?php $comments->listComments(); ?>
		<?php endif; ?>
	</div>
    <?php endif; ?>
</div>
