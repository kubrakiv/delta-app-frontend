export const getPricePerKm = (amount, distance) => {
    return (amount / distance).toFixed(2);
};
