const aggregateSalesData = (salesData) => {
    const aggregated = {};
  
    salesData.forEach(sale => {
      const { piece, saleTime, saleNumber } = sale;
  
      const key = `${piece}-${saleTime}`;

      if (!aggregated[key]) {
        aggregated[key] = {
          piece,
          saleTime,
          totalSales: 0,
        };
      }
  
      aggregated[key].totalSales += saleNumber;
    });
  
    const x = [];
    const y = [];
  
    Object.values(aggregated).forEach(item => {
      x.push(`${item.piece} (${item.saleTime})`); 
      y.push(item.totalSales);                  
    });
  
    return { x, y };
  };



const aggregateStylesData = (styleSaleResults) => {
  return styleSaleResults.reduce((acc, sale) => {
    acc[sale.style] = (acc[sale.style] || 0) + sale.saleNumber;      
    return acc;
  }, {});
};

const formatStylesData = (aggregatedData) => {
  return {
    styles: Object.keys(aggregatedData),
    sales: Object.values(aggregatedData),
  };
};

  module.exports = {
    aggregateSalesData,
    aggregateStylesData,
    formatStylesData
  }