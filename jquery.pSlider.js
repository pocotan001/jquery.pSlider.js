/**
 *  jquery.pSlider.js
 *
 *  @version    0.2
 *  @requires   jQuery v1.6+
 *  @link       https://github.com/pocotan001/jquery.pSlider.js
 *  @author     Hayato Mizuno (http://twitter.com/pocotan001)
 *  @copyright  Hayato Mizuno
 *  @license    MIT License
 */

'use strict';

(function($) {

	function Slider(node, options) {
		this.settings = $.extend({}, $.pSlider.defaults, options);
		this.$node = $(node);
		this.$slides = this.$node.find(this.settings.slidesSelector).hide().css('opacity', '0');
		this.$current = this.$slides.eq(0).show().css('opacity', '1');
		this.$paging = this.$node.find(this.settings.pagingSelector);
		this.slideSum = this.$slides.length - 1; // currentIndex と0合わせ
		this.currentIndex = 0;
		this.direction = this.settings.vertical ? 'top': 'left';
		this.speed = this.settings.speed / 2;
		this.isBusy = false;
		this.$paging.eq(0).addClass(this.settings.activeClass);

		if (0 < this.slideSum) {
			this.launch();
		}
	}

	Slider.prototype = {
		launch: function() {
			var self = this;

			this.$node.find(this.settings.nextSelector).click(function() { self.next(); });
			this.$node.find(this.settings.prevSelector).click(function() { self.prev(); });

			this.$paging.each(function(i) {
				if (self.slideSum < i) { return false; } // break

				$(this).click(function() {
					if (i !== self.currentIndex) {
						self.rotate(i, i < self.currentIndex);
					}
				});
			});

			if (isFinite(this.settings.interval) && typeof this.settings.interval !== 'boolean') {
				if (this.settings.pause) {
					this.$node.hover(function() {
						clearInterval(self.timerID);
					}, function() {
						self.timerID = setInterval(function() { self.next(); }, self.settings.interval);
					});
				}

				this.timerID = setInterval(function() { self.next(); }, this.settings.interval);
			}
		},

		rotate: function(index, isReverse) {
			if (this.isBusy) { return; }

			var self = this, $next = this.$slides.eq(index);

			this.isBusy = true;
			this.currentIndex = index;

			if (!isReverse) {
				isReverse = false;
			}

			this.$paging.removeClass(this.settings.activeClass)
				.eq(index).addClass(this.settings.activeClass);

			if (this.settings.beforeRotate) {
				this.settings.beforeRotate.call($next[0], index, isReverse);
			}

			$.Deferred(function(dfd) {
				dfd.pipe(function() {
					return self.$current.animate({
						top: !self.settings.vertical ? 0 : self.distance(isReverse),
						left: self.settings.vertical ? 0 : self.distance(isReverse),
						opacity: 0
					}, self.speed, 'linear');
				}).pipe(function() {
					self.$current.hide().css(self.direction, '0');
					self.$current = $next.show().css(self.direction, self.distance(isReverse, true));
					self.isBusy = false;

					return self.$current.animate({
						top: 0,
						left: 0,
						opacity: 1
					}, self.speed, 'linear');
				}).done(function() {
					if (self.settings.afterRotate) {
						self.settings.afterRotate.call(self.$current[0], index, isReverse);
					}
				});
			}).resolve();
		},

		next: function() {
			this.rotate(this.slideSum <= this.currentIndex ? 0 : this.currentIndex + 1);
		},

		prev: function() {
			this.rotate(this.currentIndex <= 0 ? this.slideSum : this.currentIndex - 1, true);
		},

		distance: function(isReverse, isOut) {
			var distance = isReverse ? this.settings.distance : -this.settings.distance;

			return (isOut ? -distance : distance) + 'px';
		}
	};

	$.pSlider = {};

	$.pSlider.defaults = {
		speed: 500,                    // Number:         アニメーション時のスピード(ミリ秒)
		distance: 10,                  // Number:         アニメーション時の移動距離(px)
		interval: 5000,                // Number/false:   オートプレイの間隔(ミリ秒), false ならオートプレイ無効
		pause: true,                   // Boolean:        マウスオーバー時に一時停止するかどうか
		vertical: false,               // Boolean:        アニメーションを縦方向にするかどうか
		activeClass: 'active',         // String:         アクティブ状態のページングに付与するcssクラス
		slidesSelector: '.slides > *', // String:         スライドを示すcssセレクタ
		pagingSelector: '.paging > *', // String:         ページングを示すcssセレクタ
		nextSelector: '.next',         // String:         次へを示すcssセレクタ
		prevSelector: '.prev',         // String:         前へを示すcssセレクタ
		beforeRotate: false,           // Function/false: function(index, isReverse) {}
		afterRotate: false             // Function/false: function(index, isReverse) {}
	};

	$.fn.pSlider = function(options) {
		return this.each(function() {
			new Slider(this, options);
		});
	};

})(jQuery);
