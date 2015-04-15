(function() {
        var shopList = document.getElementById('table');
        var formInput = document.getElementById('formInput');
        var shopData = [];
        var userShopData = [];

    var Shop = function(locationName, Options) {
            this.locationName = locationName;
            this.minCustomers = Options.minCustomers;
            this.maxCustomers = Options.maxCustomers;
            this.avgSold = Options.avgSold;
            this.hoursOpen = Options.hoursOpen || 11;
            this.hourlyTotals = [];
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
        Shop.prototype.render = function() {
            var daily = this.dailyAmount();
            var elTRow = document.createElement('tr');
            var elTHead = document.createElement('th');
            var elDTotal = document.createElement('td');
            elTHead.textContent = this.locationName;
            elTRow.appendChild(elTHead);
            for (var i = 0; i <= this.hoursOpen; i++) {
                var elTD = document.createElement('td');
                elTD.textContent = this.hourlyTotals[i];
                elTRow.appendChild(elTD);
            }
            elDTotal.textContent = daily;
            elTRow.appendChild(elDTotal);
            return elTRow;
        };

       window.addEventListener('load', function(event) {
            var downtown = new Shop('downtown', {minCustomers: 8, maxCustomers: 43, avgSold: 4.50}),
                capitolHill = new Shop('captiolHill', {minCustomers: 4, maxCustomers: 37, avgSold: 2.00}),
                southLakeUnion = new Shop('southLakeUnion', {minCustomers: 9, maxCustomers: 23, avgSold: 6.33}),
                wedgewood = new Shop('wedgewood', {minCustomers: 2, maxCustomers: 28, avgSold: 1.25}),
                ballard = new Shop('ballard', {minCustomers: 8, maxCustomers: 58, avgSold: 3.75});

            shopData.push(downtown);
            shopData.push(capitolHill);
            shopData.push(southLakeUnion);
            shopData.push(wedgewood);
            shopData.push(ballard);

            var renderShops = function() {
            shopData.forEach(function(shop) {
                shopList.appendChild(shop.render());
                });
            };
            renderShops();
        });

        formInput.addEventListener('submit', function(event) {
            event.preventDefault();

            var createShop = new Shop(event.target.locN.value,
                {minCustomers: event.target.minC.value,
                maxCustomers: event.target.maxC.value,
                avgSold: event.target.avgS.value});

            userShopData.push(createShop);

            event.target.locN.value = null;
            event.target.minC.value = null;
            event.target.maxC.value = null;
            event.target.avgS.value = null;

            var renderUserShops = function() {
                userShopData.forEach(function(shop) {
                    shopList.appendChild(shop.render());
                });
            };
            renderUserShops();
            userShopData = [];
        });
})();
