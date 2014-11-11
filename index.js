$.Tabs = function (el) {
	this.$el = $(el);
	this.$active = this.$el.find('h1.active');
	
	$("nav.tabs").on("click", "h1", this.switchTabs.bind(this));
	$("main").on("click", "a.projects", this.activateProjects.bind(this));
}

$.Tabs.prototype.switchTabs = function (event) {
	event.preventDefault();
	
	if (this.transitioning) {
		return
	}
	this.transitioning = true;
	
	var $currentTarget = $(event.currentTarget);
	
	var oldId = this.$active.data("title");
	var newId = $currentTarget.data("title");
	
	var oldPage = this.$el.find(oldId);
	var newPage = this.$el.find(newId);
	
	this.$active.removeClass("active");
	$currentTarget.addClass("active");

	var that = this;
	
	//transition fade in/out
	oldPage.removeClass("active").addClass("transitioning");
	oldPage.one("transitionend", function () {
		oldPage.removeClass("transitioning");
		newPage.addClass("transitioning");
		
		setTimeout(function () {
			newPage.removeClass("transitioning").addClass("active");
			that.transitioning = false;
		}, 0);
	});
	
	this.$active = $currentTarget;
}

$.Tabs.prototype.activateProjects = function (event) {
	event.preventDefault();
	var $currentTarget = $(event.currentTarget);
	this.$active.removeClass("active");
	
	this.$el.find("div#about_me").removeClass("active");
	this.$el.find("div#projects").addClass("active");
	
	this.$active = this.$el.find('h1[data-title="#projects"]');
	this.$active.addClass("active");
};

$.fn.tabs = function () {
	return this.each(function () {
		new $.Tabs(this);
	});
}