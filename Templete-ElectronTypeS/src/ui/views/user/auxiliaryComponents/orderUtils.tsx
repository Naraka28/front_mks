export const calculateTotal = (
    order,
    menuItems,
    toppingOptions,
    milksOptions,
    flavourOptions,
    sizeItems
) => {
    if (!order?.itemId) return { toppingsTotal: 0, total: 0, basePrice: 0, milkPrice: 0 };

    const product = menuItems.find(item => item.id === Number(order.itemId));
    if (!product) return { toppingsTotal: 0, total: 0, basePrice: 0, milkPrice: 0 };

    const milk = milksOptions.find(m => m.id === Number(order.milkId));
    const milkPrice = milk?.price || 0;

    let toppingsTotal = 0;

    if (order.toppings) {
        Object.entries(order.toppings).forEach(([id, free_quantity]) => {
            const topping = toppingOptions.find(t => t.id === Number(id));
            if (topping) {
                const quantity = Number(free_quantity);
                const freeQuantity = topping.free_quantity || 0;
                const pricePerUnit = topping.price || 0;
                const chargeableQuantity = Math.max(quantity - freeQuantity, 0);
                toppingsTotal += chargeableQuantity * pricePerUnit;
            }
        });
    }

    if (!milk) {
        toppingsTotal = 0;
        order.toppings = {};
    }

    const size = sizeItems.find(s => s.id === Number(order.sizeId));
    const sizePrice = size?.price || 0;

    const flavour = flavourOptions.find(f => f.id === Number(order.flavourId));
    const flavourPrice = flavour?.price || 0;

    const basePrice = product.base_price;

    const total = basePrice + sizePrice + flavourPrice + milkPrice + toppingsTotal;

    return {
        basePrice,
        toppingsTotal,
        total,
        milkPrice
    };
};