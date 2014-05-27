//Related Post For Personal Blogger

var ry = '<h3>Related Posts</h3>';
rn = '<h3>&nbsp;&nbsp;&nbsp;No related post available</h3>';
rcomment = 'comments';
rdisable = 'disable comments';
commentYN = 'no';
var dw = '';
titles = new Array();
titlesNum = 0;
urls = new Array();
timeR = new Array();
thumb = new Array();
commentsNum = new Array();
comments = new Array();

function related_results_labels(c) {
    for (var b = 0; b < c.feed.entry.length; b++) {
        var d = c.feed.entry[b];
        titles[titlesNum] = d.title.$t;
        for (var a = 0; a < d.link.length; a++) {
            if ('thr$total' in d) {
                commentsNum[titlesNum] = d.thr$total.$t + ' ' + rcomment
            } else {
                commentsNum[titlesNum] = rdisable
            }; if (d.link[a].rel == "alternate") {
                urls[titlesNum] = d.link[a].href;
                timeR[titlesNum] = d.published.$t;
                if ('media$thumbnail' in d) {
                    thumb[titlesNum] = d.media$thumbnail.url
                } else {
                    thumb[titlesNum] = 'http://lh3.ggpht.com/--Z8SVBQZ4X8/TdDxPVMl_sI/AAAAAAAAAAA/jhAgjCpZtRQ/no-image.png'
                };
                titlesNum++;
                break
            }
        }
    }
}

function removeRelatedDuplicates() {
    var b = new Array(0);
    c = new Array(0);
    e = new Array(0);
    f = new Array(0);
    g = new Array(0);
    for (var a = 0; a < urls.length; a++) {
        if (!contains(b, urls[a])) {
            b.length += 1;
            b[b.length - 1] = urls[a];
            c.length += 1;
            c[c.length - 1] = titles[a];
            e.length += 1;
            e[e.length - 1] = timeR[a];
            f.length += 1;
            f[f.length - 1] = thumb[a];
            g.length += 1;
            g[g.length - 1] = commentsNum[a]
        }
    }
    urls = b;
    titles = c;
    timeR = e;
    thumb = f;
    commentsNum = g
}

function contains(b, d) {
    for (var c = 0; c < b.length; c++) {
        if (b[c] == d) {
            return true
        }
    }
    return false
}

function printRelatedLabels(a) {
    var y = a.indexOf('?m=0');
    if (y != -1) {
        a = a.replace(/\?m=0/g, '')
    }
    for (var b = 0; b < urls.length; b++) {
        if (urls[b] == a) {
            urls.splice(b, 1);
            titles.splice(b, 1);
            timeR.splice(b, 1);
            thumb.splice(b, 1);
            commentsNum.splice(b, 1)
        }
    }
    var c = Math.floor((titles.length - 1) * Math.random());
    var b = 0;
    if (titles.length == 0) {
        dw += rn
    } else {
        dw += ry;
        dw += '<ul>';
        while (b < titles.length && b < 20 && b < maxresults) {
            if (y != -1) {
                urls[c] = urls[c] + '?m=0'
            }
            if (commentYN == 'yes') {
                comments[c] = ' - ' + commentsNum[c]
            } else {
                comments[c] = ''
            };
            dw += '<div class="related-post"><div class="related-post-title"><a href="' + urls[c] + '" rel="nofollow">' + titles[c] + '</a></div><a href="' + urls[c] + '" rel="nofollow"><img border="0" class="post-thumbnail" alt="' + titles[c] + '" src="' + thumb[c] + '"/></a></div>';
            if (c < titles.length - 1) {
                c++
            } else {
                c = 0
            }
            b++
        }
        dw += '</ul>'
    };
    urls.splice(0, urls.length);
    titles.splice(0, titles.length);
    document.getElementById('related-posts').innerHTML = dw
};
