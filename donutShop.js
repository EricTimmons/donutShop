(function() {
    var Shop = function(locationName, Options) {
            this.locationName = locationName;
            this.minCustomers = Options.minCustomers;
            this.maxCustomers = Options.maxCustomers;
            this.avgSold = Options.avgSold;
            this.opens = Options.opens || '7:00 am';
            this.closes = Options.closes || '6:00 pm';
            this.hoursOpen = Options.hoursOpen || 11;
            this.hourlyTotals = [];
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


        var shopList = document.getElementById('table');
        var formInput = document.getElementById('formInput');
        var shopData = [];

        var handleSubmit = function(event) {
            event.preventDefault();

            var createShop = new Shop(event.target.locN.value,
                {minCustomers: event.target.minC.value,
                maxCustomers: event.target.maxC.value,
                avgSold: event.target.avgS.value});
            event.target.locN.value = null;
            event.target.minC.value = null;
            event.target.maxC.value = null;
            event.target.avgS.value = null;
            shopData.push(createShop);
            renderAllShops();
        };

        formInput.addEventListener('submit', handleSubmit);

        var renderAllShops = function() {
            shopList.innerHTML = ' ';
            shopData.forEach(function(shop) {
                shopList.appendChild(shop.render());
            });
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
