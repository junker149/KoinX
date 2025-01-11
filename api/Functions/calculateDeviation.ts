export default function calculateDeviation(price: number[]) {
    var mean = 0;
    var variance = 0;

    // Calculate mean
    price.forEach((price) => {
        mean += price;
    });
    mean = mean / price.length;

    // Calculate variance
    price.forEach((price) => {
        variance += Math.pow(price - mean, 2);
    });
    variance = variance / price.length;

    // Calculate population deviation
    const deviation = Math.sqrt(variance);

    return deviation;
}