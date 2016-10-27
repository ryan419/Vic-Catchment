var arr = [1, 2, 3, [4, 5, 'a'],
	['b', ['c', {}]], 7
];

var getResult = function(ar) {
	return ar.reduce(function(sum, item) {
		if (item instanceof Array) {
			return sum + getResult(item);
		} else if (typeof item === 'number') {
			return sum + item;
		} else {
			return sum;
		}
	}, 0);
};

var getResult2 = function(ar) {
	return ar.reduce(function(sum, item) {
		if (item instanceof Array) {
			sum = sum + getResult(item);
		} else if (typeof item === 'number') {
			sum = sum + item;
		}
		return sum;
	}, 0);
};

console.log(getResult(arr));

console.log(getResult2(arr));

var Base = function() {};

/**
 * Run our data through the template and return an HTML string
 * @param  {Object} data    model attributes 
 * @return {String}         template HTML 
 */
Base.prototype.renderTemplate = function(data) {
	// some rendering code here that uses data
	// let's assume magicTemplatingCode returns a string
	console.log('renderTemplate');
	return '<div></div>';
};

/**
 * Set the template string as our .html property
 * @param  {Object} data    model attributes
 * @return {Object}         base instance 
 */
Base.prototype.render = function(data) {

	console.log('base.render');
	console.log(data);
	this.html = this.renderTemplate(data);
	this.rendered = true;
	return this;
};

// child inherits from base
var Child = function() {};
Child.prototype = Object.create(Base.prototype);

/**
 * Do something prior to rendering with our data attributes
 * @param  {Object} data    model attributes
 * @return {undefined}
 */
Child.prototype.preRender = function(data) {
	console.log('child preRender');
	// we do something here before the template is rendered
	// assume this method returns nothing of importance
};

Child.prototype.render = function() {
	this.preRender();
	var base = Object.getPrototypeOf(this);
	base.render.apply(base, arguments);
}


var child = new Child();

child.render('dsfqwer');