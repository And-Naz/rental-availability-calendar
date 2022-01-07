const FilterResponse = [
	{
		OrderNbr: "RO000018",
		Lines: [
			{
				LineNbr: 1,
				InventoryCD: "RNTITEM",
				IsSerial: false,
				SerialNbr: null,
				SerialsInfo: [],
				OrderQty: 1,
				OnHand: 15,
				AvailQty: 5,
				StartDateTime: "2021-08-01T09:00",
				EndDateTime: "2021-08-30T09:00"
			},
			{
				LineNbr: 2,
				InventoryCD: "RNTSERIAL",
				IsSerial: true,
				SerialNbr: "SRF000001",
				SerialsInfo: [
					{
						SerialNbr: "SRF000001",
						AvailQty: 0
					},
					{
						SerialNbr: "SRF000002",
						AvailQty: 1
					},
					{
						SerialNbr: "SRF000003",
						AvailQty: 1
					}
				],
				OrderQty: 1,
				OnHand: 15,
				AvailQty: 1,
				StartDateTime: "2021-08-01T09:00",
				EndDateTime: "2021-08-30T09:00"
			},
			{
				LineNbr: 3,
				InventoryCD: "RNTSERIAL2",
				IsSerial: true,
				SerialNbr: "",
				SerialsInfo: [
					{
						SerialNbr: "SRF00102",
						AvailQty: 0
					},
					{
						SerialNbr: "SRF00202",
						AvailQty: 1
					},
					{
						SerialNbr: "SRF00302",
						AvailQty: 1
					}
				],
				OrderQty: 1,
				OnHand: 15,
				AvailQty: 1,
				StartDateTime: "2021-08-01T09:00",
				EndDateTime: "2021-08-30T09:00"
			},
		]
	},
	{
		OrderNbr: "RO000019",
		Lines: [
			{
				LineNbr: 1,
				InventoryCD: "RNT_SERIAL_1",
				IsSerial: true,
				SerialNbr: "SRF000001-2",
				SerialsInfo: [
					{
						SerialNbr: "00001",
						AvailQty: 0
					},
					{
						SerialNbr: "00002",
						AvailQty: 1
					},
					{
						SerialNbr: "00003",
						AvailQty: 1
					}
				],
				OrderQty: 1,
				OnHand: 15,
				AvailQty: 1,
				StartDateTime: "2021-08-01T09:00",
				EndDateTime: "2021-08-30T09:00"
			},
			{
				LineNbr: 2,
				InventoryCD: "RNTSERIAL-3",
				IsSerial: true,
				SerialNbr: "",
				SerialsInfo: [
					{
						SerialNbr: "SRF1",
						AvailQty: 1
					},
					{
						SerialNbr: "SRF2",
						AvailQty: 1
					},
					{
						SerialNbr: "SRF3",
						AvailQty: 1
					}
				],
				OrderQty: 1,
				OnHand: 15,
				AvailQty: 1,
				StartDateTime: "2021-08-01T09:00",
				EndDateTime: "2021-08-30T09:00"
			},
		]
	},
	{
		OrderNbr: "RO000020",
		Lines: [
			{
				LineNbr: 1,
				InventoryCD: "Item - 1",
				IsSerial: false,
				SerialNbr: null,
				SerialsInfo: [],
				OrderQty: 1,
				OnHand: 15,
				AvailQty: 5,
				StartDateTime: "2021-08-01T09:00",
				EndDateTime: "2021-08-30T09:00"
			},
			{
				LineNbr: 2,
				InventoryCD: "Item - 2",
				IsSerial: false,
				SerialNbr: null,
				SerialsInfo: [],
				OrderQty: 1,
				OnHand: 15,
				AvailQty: 5,
				StartDateTime: "2021-08-01T09:00",
				EndDateTime: "2021-08-30T09:00"
			},
		]
	},
];

export default FilterResponse