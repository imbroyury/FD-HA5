function CarES5(weight, hp, gasTankVolume) {
    if (weight > 0 && hp > 0 && gasTankVolume > 0) {
        this.weight = weight;
        this.hp = hp;
        this.gasTankVolume = gasTankVolume;
        this.getFuelConsumption();
        this.getZeroToHundred();
        this.getMaxSpeed();
    } else {
        console.log("Can't accept negative values or zero");
    }
}

CarES5.prototype.getFuelConsumption = function () {
    this.fuelConsumption = (this.hp * (this.weight + this.gasTankVolume)) / 20000;
};

CarES5.prototype.getZeroToHundred = function () {
    let computedValue = (this.weight + this.gasTankVolume) / this.hp;
    if (computedValue >= 3 && computedValue <= 30) {
        this.zeroToHundred = computedValue;
    } else if (computedValue < 3) {
        console.log(`Warning! Unrealistic zero to hundred speed of ${computedValue} seconds. Set to default value of 3 seconds`);
        this.zeroToHundred = 3;
    } else if (computedValue > 30) {
        console.log(`Warning! Unrealistic zero to hundred speed of ${computedValue} seconds. Set to default value of 30 seconds`);
        this.zeroToHundred = 30;
    }
};

CarES5.prototype.getMaxSpeed = function () {
    let computedValue = (this.hp / (this.weight + this.gasTankVolume)) * 4000;
    if (computedValue >= 100 && computedValue <= 300) {
        this.maxSpeed = computedValue;
    } else if (computedValue < 100) {
        console.log(`Warning! Unrealistic max speed of ${computedValue} km / h. Set to default value of 100 km / h`);
        this.maxSpeed = 100;
    } else if (computedValue > 300) {
        console.log(`Warning! Unrealistic max speed of ${computedValue} km / h. Set to default value of 300 km / h`);
        this.maxSpeed = 300;
    }
};

CarES5.prototype.race = function (distance) {
    if (distance > 0) {
        let travelTime = 0,
            reachMaxSpeedTime = this.zeroToHundred + (this.maxSpeed / 100 - 1) * this.zeroToHundred * 1.5,
            reachMaxSpeedDistance = reachMaxSpeedTime * (this.maxSpeed / 3600 / 2),
            refuelCount = Math.floor(distance / (this.gasTankVolume / this.fuelConsumption * 100)),
            refuelTime = getRefuelTime(this.gasTankVolume, refuelCount);

        if (reachMaxSpeedDistance < distance) {
            travelTime = refuelCount * reachMaxSpeedTime + (distance - refuelCount * reachMaxSpeedDistance) / (this.maxSpeed / 3600) + refuelTime;
        } else if (reachMaxSpeedDistance >= distance) {
            travelTime = distance / (this.maxSpeed * (reachMaxSpeedDistance / distance) / 3600 / 2);
        }

        return formatTime(travelTime);

    } else {
        console.log("Method can't accept negative values or zero");
    }

    function formatTime(seconds) {
        return new Date(seconds * 1000).toISOString().substr(11, 12);
    }

    function getRefuelTime(tankVolume, refuelCount) {
        return refuelCount * (5 * 60 + tankVolume * 2);
    }
};

let carES5 = new CarES5(2000, 150, 55);

console.log(carES5);

console.log(carES5.race(1500));