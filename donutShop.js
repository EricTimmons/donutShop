(function() {
    var Shop = function(locationName, options) {
            this.locationName = locationName;
            this.minCustomers = options.minCustomers;
            this.maxCustomers = options.maxCustomers;
            this.avgSold = options.avgSold;
            this.opens = options.opens || '7:00 am';
            this.closes = options.closes || '6:00 pm';
            this.hoursOpen = options.hoursOpen || 11;
        };
        Shop.prototype.render = function() {
            var el = document.createElement('li');
            el.innerHTML = 'At the ' + this.locationName + ' store you will need to make ' + this.hourlyAmount() + ' donuts per hour, and ' + this.dailyAmount() + ' for one whole day.';
            return el;
        };
        Shop.prototype.generateRandom = function() {
            return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers);
        };
        Shop.prototype.hourlyAmount = function() {
            return Math.floor(this.generateRandom() * this.avgSold);
        };
        Shop.prototype.dailyAmount = function() {
            var total = 0;
            for (var i = 0; i < this.hoursOpen; i++) {
                total += this.hourlyAmount();
            }
            return total;
        };

        var downtown = new Shop('Downtown', {minCustomers: 8, maxCustomers: 43, avgSold: 4.50});
            capitoldHill = new Shop('Captiol Hill', {minCustoners: 4, maxCustomers: 37, avgSold: 2.00}),
            southLakeUnion = new Shop('South Lake Union', {minCustomers: 9, maxCustomers: 23, avgSold: 6.33}),
            wedgewood = new Shop('Wedgewood', {minCustomers: 2, maxCustomers: 28, avgSold: 1.25}),
            ballard = new Shop('Ballard', {minCustomers: 8, maxCustomers: 58, avgSold: 3.75});

        var list = document.getElementById('store-list');
        list.appendChild(downtown.render());
        list.appendChild(capitoldHill.render());
        list.appendChild(southLakeUnion.render());
        list.appendChild(wedgewood.render());
        list.appendChild(ballard.render());
})();
