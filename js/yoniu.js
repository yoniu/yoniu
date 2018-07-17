/*
Design by 小智（https://www.yoniu.xyz）
*/
$(function() {
	tbquire(['nprogress'], function() {
    NProgress.start()

    setTimeout(function() {
      NProgress.done()
      var els = [].slice.call(document.querySelectorAll('.out'))
      els.forEach(function (el) {
        el.className = el.className.replace(' out', '')
      })
    }, 600)
	})
	$(".comment-body .comment-reply").hide();
	$(".comment-body").hover(function() {
		$(this).find(".comment-reply").toggle()
	},
	function() {
		$(this).find(".comment-reply").toggle()
	});
	$.getJSON(themeurl + "setting.php?check=read",
	function(json) {
		if (json.emMsg == "success") {
			if (json.header == "") {
				$(".header-img").attr("style", "background: url(" + themeurl + "'images/header.jpg') center;background-position: 50%;background-size: cover;")
			} else {
				$(".header-img").attr("style", "background: url('" + json.header + "') center;background-position: 50%;background-size: cover;")
			}
			$(".footerbar").append(json.design);
			if (json.navico == "") {
				$("#navicospan").attr("class", "glyphicon glyphicon-globe")
			} else {
				$("#navicospan").attr("class", json.navico)
			}
			$("body").attr("style", "background: url('" + json.background + "') no-repeat #f1f1f1;background-attachment: fixed;background-size: cover;");
		}
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > 0) {
			$("#back-to-top").fadeIn()
		} else {
			$("#back-to-top").fadeOut()
		}
	});
	$("#back-to-top").click(function() {
		$("body,html").animate({
			scrollTop: 0
		},
		500);
		return false
	})
	
	if($("#pagenavi .next").length > 0) {}else{$("#pagenavi").attr("style","display:none");}
	
	$("#pagenavi").on('click','a', function(){     
	    $(this).attr("style","display:none");
		$("#pagenavi").removeClass("pagenavi");
	    var href = $(this).attr("href");
	    if (href != undefined) {
	        $.ajax( {
	            url: href,
	            type: "get",
	        beforeSend:function(){
				$(".bouncing-loader").attr("style","display: flex");
	        },
	        error: function(request) {},   
	        success: function(data) {
				tbquire(['blazy'], function() {var bLazy = new Blazy({ container: '.blog-main'});})
				$(".bouncing-loader").attr("style","display:none");
				$("#pagenavi").addClass("pagenavi");
				$("#pagenavi a").attr("style","display:block");
	            var $res = $(data).find(".list-article");
	            $('#blog-200011-net').append($res.fadeIn('slow'));
	            var newhref = $(data).find("#pagenavi .next").attr("href");
	            if( newhref != undefined ){   
	                $("#pagenavi a").attr("href",newhref);   
	            }else{   
	                $("#pagenavi").text("加载完毕"); 
	            }   
	        }   
	        });   
	    }   
		return false;   
	});
	
	$(".comment-face>a").click(function() {
		var btnVal = $(this).attr("title");
		var str = $("#commentform>textarea").val() + btnVal;
		$("#commentform>textarea").val(str)
	})
	
	$(".bouncing-loader").attr("style","display:none");

	$(".archives h4").click(function() {
		$(this).next("ul").slideToggle("fast")
	})
	tbquire(['blazy'], function() {
	var bLazy = new Blazy({ container: '.blog-main'});
	})
});