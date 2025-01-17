
import { db } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
const get_last = async ()=> {
    let prices:any[] = [],i=0;
    let now = new Date();
    let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    while(prices.length==0 && i<6) {
      console.log(prices)
      prices = await db.price.findMany({where:{
        date:{
            gte: startOfDay,
            lte: endOfDay
          }
    }})
    i = i+1;
    now.setDate(now.getDate() - i);
    startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  }
return prices;}
async function handler(req: NextRequest) {
  
  const {type} = await req.json()
  let stores,bulletins,currencies,prices;
  console.log(type)
  if(!type){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }
  let  now = new Date();
  let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        if (type=='stores') {
            stores = await db.store.findMany()
            console.log(stores);
            if(stores) return NextResponse.json({ok:true,stores:stores},{status:200})
        }
        else if (type=='bulletins') {
            bulletins = await db.bulletin.findMany()
            console.log(bulletins);
            if(bulletins) return NextResponse.json({ok:true,bulletins:bulletins},{status:200})
        }
       else if (type=='currencies') {
        currencies = await db.currency.findMany()
        console.log(currencies);
        if(currencies) return NextResponse.json({ok:true,currencies:currencies},{status:200})
    }
    else if (type=='prices') {
        prices = await get_last();

      
        }
        console.log(prices);
        if(prices) return NextResponse.json({ok:true,prices:prices},{status:200});
        return NextResponse.json({message:'Internal Error'},{status:500})
    }
     
       
        
    




export {handler as POST, handler as GET };
