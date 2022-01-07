const Data = {
	Items: [
		{
			name: "ELECOMP2",
			description: "Lenovo laptop computer",
			isSerial: false,
			serialNo: null,
			rentalOrders: [
				{ orderNo: "ORD0001", date: "2021-07-12", qtyOrdered: 3, onHand: 12 },
				{ orderNo: "ORD0002", date: "2021-07-15", qtyOrdered: 1, onHand: 12 },
				{ orderNo: "ORD0003", date: "2021-07-16", qtyOrdered: 6, onHand: 12 }
			]
		},
		{
			name: "RNTITEM",
			description: "Acer Laptop Computer",
			isSerial: false,
			serialNo: null,
			rentalOrders: [
				{ orderNo: "ORD0003", date: "2021-07-13", qtyOrdered: 3, onHand: 20 },
				{ orderNo: "ORD0004", date: "2021-07-13", qtyOrdered: 4, onHand: 20 },
				{ orderNo: "ORD0008", date: "2021-07-14", qtyOrdered: 2, onHand: 20 },
				{ orderNo: "ORD0009", date: "2021-07-14", qtyOrdered: 2, onHand: 20 },
				{ orderNo: "ORD0010", date: "2021-07-14", qtyOrdered: 2, onHand: 20 }
			]
		},
		{
			name: "RNTSERIAL",
			description: "Injection molding machine - serial numbered",
			isSerial: true,
			serialNo: "SERIAL_1",
			rentalOrders: [
				{ orderNo: "ORD0001", date: "2021-07-12", qtyOrdered: 1, onHand: 17 },
			]
		},
		{
			name: "RNTSERIALINS",
			description: "Injection molding machine - serial numbered",
			isSerial: true,
			serialNo: "SERIAL_2",
			rentalOrders: [
				{ orderNo: "ORD0005", date: "2021-07-14", qtyOrdered: 1, onHand: 18 },
			]
		},
		{
			name: "RNTSERIALSWAP",
			description: "Injection molding machine - serial numbered",
			isSerial: true,
			serialNo: "SERIAL_3",
			rentalOrders: [
				{ orderNo: "ORD0005", date: "2021-07-12", qtyOrdered: 1, onHand: 30 },
				{ orderNo: "ORD0004", date: "2021-07-14", qtyOrdered: 1, onHand: 30 },
				{ orderNo: "ORD0006", date: "2021-07-16", qtyOrdered: 1, onHand: 30 },
			]
		},
	],
}

export default Data