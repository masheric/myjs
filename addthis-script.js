// This script taken From Addthis

var addthis_product = "blg";
document.doAT = function(cl)
{
        var myclass = new RegExp('hentry');
        var myTitleContainer = new RegExp('post-title');
        var myPostContent = new RegExp('post-footer');
        var elem = this.getElementsByTagName('div');

        var url;
        var title = "";
        
        for (var i = 0; i < elem.length; i++)
        {
            var classes = elem[i].className;
            if (myclass.test(classes))
            {   
            	var container = elem[i];
            	url = window.location.href;
            	
                for (var b = 0; b < container.childNodes.length; b++)
                {
                    var item = container.childNodes[b].className;
                    if (myTitleContainer.test(item))
                    {
                        var link = container.childNodes[b].getElementsByTagName('a');
                        if (typeof(link[0]) != 'undefined')
                        {
                            var url = link[0].href;
                            var title = link[0].innerHTML;
                        }

                    var singleq = new RegExp("'", 'g');
                    var doubleq = new RegExp('"', 'g');                                                                                                                                                                                                                        
                    title = title.replace(singleq, '&#39;', 'gi');
                    title = title.replace(doubleq, '&#34;', 'gi');

                    }
                    if (myPostContent.test(item))
                    {
                        var footer = container.childNodes[b];
                    }
                }
	                var n = document.createElement('div');
	                var at = "<div class='addthis_toolbox addthis_default_style ' addthis:title='"+title+"' addthis:url='"+encodeURI(url)+"'   > <a class='addthis_button_facebook_like' fb:like:layout='button_count'></a> <a class='addthis_button_tweet'></a> <a class='addthis_button_pinterest_pinit' pi:pinit:layout='horizontal'></a> <a class='addthis_counter addthis_pill_style'></a> </div> ";
	                n.innerHTML = at;
	                container.insertBefore(n , footer);   
            }
        }
    return true;
};

document.doAT('hentry');
