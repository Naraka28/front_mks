import React from 'react';
import { UniversalTopBar } from '../dashboard/auxiliaryComponents/UniversalTopBar';
import OrderComponent from './orderComponent';

interface OrderItem {
  ordenId: string;
  itemId: string;
  tempId: string;
  sizeId: string;
  flavourId: string;
  coffeeBeansId: string;
  milkId: string;
  toppings: Record<number, number>;
  toppingsTotal?: number;
  subtotal?: number;
  iva?: number;
  total?: number;
}

interface BodyCashierProps {
  orderStatus: 'pending' | 'completed';
}

const exampleOrders: OrderItem[] = [
  {
    ordenId: "1",
    itemId: "2",
    tempId: "1",
    sizeId: "3",
    flavourId: "1",
    coffeeBeansId: "1",
    milkId: "1",
    toppings: {
      1: 2,
      2: 1
    }
  },
  {
    ordenId: "2",
    itemId: "2",
    tempId: "1",
    sizeId: "3",
    flavourId: "2",
    coffeeBeansId: "2",
    milkId: "2",
    toppings: {
      3: 1,
      4: 1
    }
  }
  ,
  {
    ordenId: "3",
    itemId: "2",
    tempId: "1",
    sizeId: "1",
    flavourId: "3",
    coffeeBeansId: "3",
    milkId: "1",
    toppings: {
      5: 2,
      6: 1,
      7: 1
    }
  }
  ,
  {
    ordenId: "4",
    itemId: "2",
    tempId: "1",
    sizeId: "2",
    flavourId: "4",
    coffeeBeansId: "4",
    milkId: "2",
    toppings: {
      7: 1,
      8: 1
    }
  }
];

const BodyCashier: React.FC<BodyCashierProps> = ({ orderStatus }) => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow min-h-screen">
      <div className="w-full px-4 grid gap-3 grid-cols-12">
        <div className="col-span-12 w-full">
          <UniversalTopBar />
        </div>
        <div className="col-span-12 p-4">
          {orderStatus === 'pending' ? (
            <div>
              <p className="text-xl font-bold mb-4">Mostrando órdenes pendientes</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {exampleOrders.map((order, index) => (
                  <OrderComponent key={index} order={order} />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl font-bold mb-4">Mostrando órdenes concluidas</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {exampleOrders.map((order, index) => (
                  <OrderComponent key={index} order={order} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyCashier;