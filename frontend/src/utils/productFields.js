export const getPacketWeightValue = (product = {}) =>
    product.packetWeight ||
    product.netWeight ||
    product.weight ||
    product.category ||
    '';

export const normalizeProductWeight = (product = {}) => ({
    ...product,
    packetWeight: getPacketWeightValue(product),
});
