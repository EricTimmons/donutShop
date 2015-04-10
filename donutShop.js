(function() {
    var Shop = function(locationName, options) {
            this.locationName = locationName;
            this.minCustomers = options.minCustomers;
            this.maxCustomers = options.maxCustomers;
            this.avgSold = options.avgSold;
            this.opens = options.opens || '7:00 am';
            this.closes = options.closes || '6:00 pm';
            this.hoursOpen = options.hoursOpen || 11;
            this.hourlyTotals = [];
            this.listOfShops = [];
        };
        Shop.prototype.render = function() {
            var daily = this.dailyAmount();
            var elTableRow = document.getElementById(this.locationName);
            for (var i = 0; i <= this.hoursOpen; i++) {
                var el = document.createElement('td');
                el.textContent = this.hourlyTotals[i];
                elTableRow.appendChild(el);
            }
            el.textContent = daily;
            elTableRow.appendChild(el);
        };
        Shop.prototype.generateRandom = function() {
            return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers);
        };
        Shop.prototype.hourlyAmount = function() {
            return Math.floor(this.generateRandom() * this.avgSold);
        };
        Shop.prototype.dailyAmount = function() {
            var total = 0;
            var hourlyDonuts = 0;
            for (var i = 0; i < this.hoursOpen; i++) {
                hourlyDonuts = this.hourlyAmount();
                this.hourlyTotals.push(hourlyDonuts);
                total += hourlyDonuts;
            }
            return total;
        };

        var downtown = new Shop('downtown', {minCustomers: 8, maxCustomers: 43, avgSold: 4.50}),
            capitolHill = new Shop('captiolHill', {minCustomers: 4, maxCustomers: 37, avgSold: 2.00}),
            southLakeUnion = new Shop('southLakeUnion', {minCustomers: 9, maxCustomers: 23, avgSold: 6.33}),
            wedgewood = new Shop('wedgewood', {minCustomers: 2, maxCustomers: 28, avgSold: 1.25}),
            ballard = new Shop('ballard', {minCustomers: 8, maxCustomers: 58, avgSold: 3.75});

            downtown.render();
            capitolHill.render();
            southLakeUnion.render();
            wedgewood.render();
            ballard.render();
})();
