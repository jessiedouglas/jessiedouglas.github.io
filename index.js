$.Tabs = function (el) {
	this.$el = $(el);
	this.$active = this.$el.find("div.active");
	
	$("nav.tabs").on("click", "h1", this.switchTabs.bind(this))
}

$.Tabs.prototype.switchTabs = function (event) {
	event.preventDefault();
	var $currentTarget = $(event.currentTarget);
	
	var oldId = this.$active.data("title");
	var newId = $currentTarget.data("title");
	
	var oldPage = this.$el.find(oldId);
	var newPage = this.$el.find(newId);
	
	oldPage.removeClass("active");
	newPage.addClass("active");
	
	this.$active = $currentTarget;
}

$.fn.tabs = function () {
	return this.each(function () {
		new $.Tabs(this);
	});
}