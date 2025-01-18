
import { db } from "@/app/lib/db";
import { Price } from "@/app/prices/page";
import { NextRequest,NextResponse } from "next/server";

const get_last = async (name:string,state:string,city:string)=> {
  let prices:any[] = [],i=0;
  let now = new Date();
  let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  while(prices.length==0 && i<6) {
    console.log(prices)
  prices = await db.price.findMany({where:{
    name:name,state:state,city:city, date:{
      gte: startOfDay,
      lte: endOfDay
    }
  }
  })
  i = i+1;
  now.setDate(now.getDate() - i);
  startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

}

return prices;
}
const calculate_mean = (prices:any)=> {
  let sale_mean=0,sum1 = 0,purchase_mean=0,sum2=0,sale_stdDev=0,purchase_stdDev=0;
  for (let p of prices) {
sum1= sum1+p.sale_price;
sum2= sum2+p.purchase_price;
  }
  sale_mean = sum1/prices.length;
purchase_mean = sum2/prices.length;
// Calculate variance
const sale_variance = prices.reduce((acc:any, curr:any) => 
  acc + Math.pow(curr.sale_price - sale_mean, 2), 0) / prices.length;
const purchase_variance = prices.reduce((acc:any, curr:any) => 
  acc + Math.pow(curr.purchase_price - sale_mean, 2), 0) / prices.length;
// Calculate standard deviation
sale_stdDev = Math.sqrt(sale_variance);
purchase_stdDev = Math.sqrt(purchase_variance);
console.log(sale_stdDev);
console.log(purchase_stdDev);
  return {sale_mean:sale_mean,purchase_mean:purchase_mean,sale_stdDev:sale_stdDev,purchase_stdDev:purchase_stdDev};

}
const calculate_limits = (mean:any,sale_std:number,purchase_std:number)=> {
  let max_purchase_price,max_sale_price,min_sale_price,min_purchase_price;
  if (sale_std!=0) {
    max_sale_price = Number((mean.sale_mean+(2*sale_std)).toFixed(2));
    min_sale_price = Number((mean.sale_mean-(2*sale_std)).toFixed(2));
   }
   else {
    max_sale_price = Number((mean.sale_mean+(0.2*mean.sale_mean)).toFixed(2));
    min_sale_price = Number((mean.sale_mean-(0.2*mean.sale_mean)).toFixed(2));
   }
   if (purchase_std!=0) {
    max_purchase_price = Number((mean.purchase_mean+(2*purchase_std)).toFixed(2));
    min_purchase_price = Number((mean.purchase_mean-(2*purchase_std)).toFixed(2));
   }
   else {
    max_purchase_price = Number((mean.purchase_mean+(0.2*mean.purchase_mean)).toFixed(2));
    min_purchase_price = Number((mean.purchase_mean-(0.2*mean.purchase_mean)).toFixed(2));
   }
   console.log('max_purchase_price')
   console.log(max_purchase_price)
   console.log('min_purchase_price')
   console.log(min_purchase_price)
   console.log('max_sale_price')
   console.log(max_sale_price)
   console.log('min_sale_price')
   console.log(min_sale_price)
   return {max_purchase_price:max_purchase_price,min_purchase_price:min_purchase_price,max_sale_price:max_sale_price,min_sale_price:min_sale_price}

}
async function handler(req: NextRequest) {
  
  const {storeName, state,city,currencies} = await req.json()
  console.log(storeName)
  console.log(state)
  console.log(city)
  if(!storeName || !state || !city || currencies.length==0){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }
       //let k = db.store.findMany({ where: {name:name},
        //select: {
        //  name: true
        //},});
        //if (k) 
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        let currency,date,all,mean,price,prices,sale_percentageChange,
        purchase_percentageChange,purchase_std,sale_std,max_purchase_price,
        max_sale_price,min_sale_price,min_purchase_price,limits;
        let products = []
        for (let c of currencies) {
          console.log(c);
            date = new Date();
          currency = await db.currency.create({
            data: {
          store_name:storeName,
           name: c.name,
           sale_price: c.sale_price,
           purchase_price:c.purchase_price,
           state:state,
           city:city,
           date: date,
          }})
          console.log(currency)
          if (currency) products.push(currency);
          all = await db.currency.findMany({where:{name:c.name,state:state,city:city,date:{
            gte: startOfDay,
            lte: endOfDay
          }}});
          mean = calculate_mean(all);
          console.log(mean);
          /*prices = await db.price.findMany({where:{
            name:c.name,state:state,city:city, date:{
              gte: startOfDay,
              lte: endOfDay
            }
          }
          })*/
          prices = await get_last(c.name,state,city);
          console.log(prices)
          sale_std = Number(mean.sale_stdDev.toFixed(2));
          purchase_std = Number(mean.purchase_stdDev.toFixed(2));
          limits = calculate_limits(mean,sale_std,purchase_std);
         all = await db.currency.findMany({where:{name:c.name,state:state,city:city,date:{
          gte: startOfDay,
          lte: endOfDay
        },sale_price:{
          gte: limits.min_sale_price,
          lte: limits.max_sale_price
        },purchase_price:{
          gte: limits.min_purchase_price,
          lte: limits.max_purchase_price
        }}});
        console.log('after re')
        console.log(all)
        mean = calculate_mean(all);
          console.log(mean);
          sale_std = Number(mean.sale_stdDev.toFixed(2));
          purchase_std = Number(mean.purchase_stdDev.toFixed(2));
          limits = calculate_limits(mean,sale_std,purchase_std);
          if (prices.length != 0) {
              sale_percentageChange = (100*(mean.sale_mean - prices[0].sale_price)/mean.sale_mean)
              purchase_percentageChange = (100*(mean.purchase_mean - prices[0].purchase_price)/mean.purchase_mean)
              price = await db.price.update({where: {
                id:prices[0].id
               }, data: {
                date:now,
                sale_price:Number(mean.sale_mean.toFixed(2)),
                purchase_price:Number(mean.purchase_mean.toFixed(2)),
                purchase_percentageChange:purchase_percentageChange,
                sale_percentageChange:sale_percentageChange,
                sale_std:sale_std,
                purchase_std:purchase_std,
                max_purchase_price:limits.max_purchase_price,
                min_purchase_price:limits.min_purchase_price,
                max_sale_price:limits.max_sale_price,
                min_sale_price:limits.min_sale_price
               }})
          }
          else {
            sale_percentageChange = (100*(mean.sale_mean - 0)/mean.sale_mean)
            purchase_percentageChange = (100*(mean.purchase_mean - 0)/mean.purchase_mean)
            price = await db.price.create({ data: {
              name:c.name,
                state:state,
                city:city,
              date:now,
              sale_price:Number(mean.sale_mean.toFixed(2)),
              purchase_price:Number(mean.purchase_mean.toFixed(2)),
              purchase_percentageChange:purchase_percentageChange,
              sale_percentageChange:sale_percentageChange,
              sale_std:Number(mean.sale_stdDev.toFixed(2)),
              purchase_std:Number(mean.purchase_stdDev.toFixed(2)),
              max_purchase_price:limits.max_purchase_price,
              min_purchase_price:limits.min_purchase_price,
              max_sale_price:limits.max_sale_price,
              min_sale_price:limits.min_sale_price
             }})
          }
        }
        console.log(products.length)
        const store = await db.store.findMany({
          where: {name:storeName},
        })
      const refcite = await db.bulletin.create({
        data:{
       store:{connect:{id:store[0].id}},
        state:state,
        city:city,
        date: now,
        products: {connect: products.map(currency=>({ id: currency.id }))}
        }
      })
      console.log('m')
      console.log(refcite)
      console.log(price)
     
      if(refcite && price)return NextResponse.json({ok:true},{status:200})
       
        return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
