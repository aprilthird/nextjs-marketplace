export default class NumberUtils {
  static getFormattedPriceOrDiscount(number: number): string {
    return number % 1 != 0 ? number.toFixed(2) : number.toFixed(0);
  }

  static getTimeStampHoursToDays(number: number): string {
    const hoursOrDays = number > 24 ? Math.ceil(number / 24) : number;
    return number > 24
      ? `${hoursOrDays} ${hoursOrDays > 1 ? "días" : "día"}`
      : `${hoursOrDays} ${hoursOrDays > 1 ? "horas" : "hora"}`;
  }

  static getCantidadTipo(selectKey: string): string {
    var select = [
      {
        label: "Unidad",
        modalKey: "UNIT",
        value: "8",
        cantidad: 1,
      },
      {
        label: "3 Unidades",
        modalKey: "THREE",
        value: "7",
        cantidad: 3,
      },
      {
        label: "Decena (10)",
        modalKey: "TEN",
        value: "6",
        cantidad: 10,
      },
      {
        label: "Docena (12)",
        modalKey: "DOZEN",
        value: "5",
        cantidad: 12,
      },
      {
        label: "Media centena (50)",
        modalKey: "HALF_HUNDRED",
        value: "4",
        cantidad: 50,
      },
      {
        label: "Centena (100)",
        modalKey: "HUNDRED",
        value: "3",
        cantidad: 100,
      },
      {
        label: "Medio millar (500)",
        modalKey: "HALF_THOUSAND",
        value: "2",
        cantidad: 500,
      },
      {
        label: "Millar (1000)",
        modalKey: "THOUSAND",
        value: "1",
        cantidad: 1000,
      },
    ];

    const selectedItem = select.find((item) => item.modalKey === selectKey);

    return selectedItem ? selectedItem.value : "8";
  }
}
