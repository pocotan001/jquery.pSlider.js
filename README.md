jquery.pSlider.js
======================

Usage
------
### HTML ###
	<div id="slider">
	
	  <ul class="slides">
	    <li>スライド1</li>
	    <li>スライド2</li>
	    ...
	  </ul>
	
	  <ul class="paging">
	    <li>ページング1</li>
	    <li>ページング2</li>
	    ...
	  <!-- /省略可 --></ul>
	
	  <ul>
	    <li class="next">次へ</li>
	    <li class="prev">前へ</li>
	  <!-- /省略可 --></ul>
	
	<!-- /#slider --></div>

### CSS ###
	div#slider ul.slides {
	  position: relative;
	  height: 120px; /* スライドの高さ */
	}
	div#slider ul.slides li {
	  position: absolute;
	  top: 0;
	  left: 0;
	}
	div#slider ul.paging li.active {
	  /* アクティブ状態 */
	}

### JavaScript ###
	$(function() {
	  $('#slider').pSlider(/*[options]*/);
	});

Options
----------------
オプション名|デフォルト値|説明
---|---|---|---
speed|250|アニメーション時のスピード(ミリ秒)
distance|10|アニメーション時の移動距離(px)
interval|5000|オートプレイの間隔(ミリ秒)、false ならオートプレイ無効
pause|true|マウスオーバー時に一時停止するかどうか
vertical|false|アニメーションを縦方向にするかどうか
activeClass|'active'|アクティブ状態のページングに付与するcssクラス
slidesSelector|'.slides > *'|スライドを示すcssセレクタ
pagingSelector|'.paging > *'|ページングを示すcssセレクタ
nextSelector|'.next'|次へを示すcssセレクタ
prevSelector|'.prev'|前へを示すcssセレクタ
beforeRotate|false|スライド前に実行する関数 function(index, isReverse) {}
afterRotate|false|スライド後に実行する関数 function(index, isReverse) {}

License
----------
[MIT License](http://www.opensource.org/licenses/mit-license.php)
