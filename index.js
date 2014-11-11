$.Tabs = function (el) {
	this.$el = $(el);
	this.$active = this.$el.find('h1.active');
	
	$("nav.tabs").on("click", "h1", this.switchTabs.bind(this));
	$("main").on("click", "a.projects", this.activateProjects.bind(this));
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
	
	this.$active.removeClass("active");
	$currentTarget.addClass("active");
	
	this.$active = $currentTarget;
}

$.Tabs.prototype.activateProjects = function (event) {
	event.preventDefault();
	var $currentTarget = $(event.currentTarget);
	
	this.$el.find("div#about_me").removeClass("active");
	this.$el.find("div#projects").addClass("active");
	
	this.$active = this.$el.find('h1[data-title="#projects"]');
};

$.fn.tabs = function () {
	return this.each(function () {
		new $.Tabs(this);
	});
}