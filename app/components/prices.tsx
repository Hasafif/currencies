'use client'
import React, { useState,useEffect } from 'react';
//import Ho from './components/mo';
import Navbar from '@/app/components/navbar';
import DataTable from '../components/DataTable';
import axios from 'axios';
import { socket } from '../../socket';
import { io, Socket } from 'socket.io-client';
import { showToast } from '../components/Notification/Toast';
//import { getSession } from '../lib/auth';
//import { redirect } from 'next/navigation';
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    createdAt: string;
  }
  interface currency {
    id: string;
    name: string;
    store_name: string;
    state: string;
    city: string;
    sale_price: GLfloat;
    purchase_price: GLfloat;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    bulletin: bulletin[];
  }
interface bulletin {
    id: string;
  store: Store;
 storeid: string
  date: Date;
  state: string;
  city: string;
  products: currency[];
  createdAt: Date;
  updatedAt: Date;
}
  interface Store {
    id: string;
    name: string;
    state: string;
    city: string;
    address: string
    email: string
    phone: string
    currencies: string
    bulletin: bulletin[]
    createdAt: Date;
  }
  export interface Price {
    id: string; 
  name: string;
  date: Date;
  sale_price: GLfloat;
  sale_std: GLfloat;
  purchase_price: GLfloat;
  purchase_std: GLfloat;
  max_sale_price: GLfloat;
  max_purchase_price:GLfloat;
  min_sale_price: GLfloat;
  min_purchase_price:GLfloat;
  state: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  }
  
  // Column definitions
  const columns: any[] = [
    { key: 'id', label: 'ID', type: 'string', sortable: true },
    { key: 'name', label: 'name', type: 'string', sortable: true },
    { key: 'date', label: 'Date', type: 'datetime', sortable: true },
    { key: 'sale_price', label: 'Sale_Price', type: 'Float', sortable: true },
    { key: 'purchase_price', label: 'Purchase_Price', type: 'Float', sortable: true },
    { key: 'state', label: 'State', type: 'string', sortable: true },
    { key: 'City', label: 'City', type: 'string', sortable: true },
    { key: 'created at', label: 'Created At', type: 'datetime', sortable: true },
    { key: 'updated at', label: 'Updated At', type: 'datetime', sortable: true }
  ];
export default function Prices() {
  
 
    const [prices, setPrices] = useState<Price[]>([]);
    const [filteredPrices, setfiltered_Prices] = useState<Price[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setsearch] = useState(false);
    const [pricename, setPricename] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    //const session = await getSession();
    //const [socket_state, setSocket_state] = useState('try connecting...');
    //const [socket, setSocket] = useState(null);
  
    /*useEffect(() => {
      //fetch('api/pages');
      const s = io('http://localhost:3000', {
        path: "/api/pages"
      });
      setSocket(s);
    }, []);
    if (socket) {
      socket.on('connect', () => {
        console.log('connected successfully', socket.id);
        setSocket_state('connected successfully 👍');
      });
    }*/
    const handleAdd = () => {
      // Handle add logic
    };
  
    const handleDelete = async (price: Price) => {
      // Handle delete logic
      const res = await axios.post('/api/delete',{type:'prices',id:price.id})
      if (res.status==200) {showToast.success({message:'Price Deleted Succefully',duration:5000})
         const filteredPrices = prices.filter(p => p.id != price.id);
        setPrices(filteredPrices);
        setfiltered_Prices(filteredPrices);
      }
    else {
        showToast.error({message:'Error Deleting Price',duration:5000})
      }
      };
  
    const handleSort = (key: string, direction: any) => {
      // Handle sort logic
    };
  
    const handleSearch = (searchTerm: string) => {
       // Handle search logic
       setsearch(false)
       console.log(searchTerm)
       setPricename(searchTerm)
       setsearch(true)
    };
   
  useEffect(() => {
    const getbulletins = async () => {
        const res = await axios.post('http://localhost:3000/api/stores',{type:'prices'})
          console.log(res.data.prices)
        setPrices(res.data.prices);
          setIsLoading(false);
    };
    getbulletins();
  } 
  , []);
   useEffect(() => {
      if (search) {
        setsearch(true);
          // Filter the projects array based on the name
     const filteredPrices = prices.filter(price => price.name === pricename);
     //filteredPrices.forEach(price => console.log(price.name));
    if (filteredPrices.length==0 && (pricename== ' '|| pricename== ' '|| pricename=='')) {
      setfiltered_Prices(prices)
      console.log(filteredPrices)
    }
    else {
      setfiltered_Prices(filteredPrices);
      console.log(filteredPrices)
    }
  
   
  }
    }, [setPricename,pricename,setsearch,search]);
   /*useEffect(() => {
      const socket: Socket = io();
      socket.on('updates', (updates:any) => {
        console.log(updates)
        setPrices(prevData => [...prevData, ...updates]);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);*/
   /*useEffect(() => {
      if (socket.connected) {
        onConnect();
      }
  
      function onConnect() {
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name);
  
        socket.io.engine.on("upgrade", (transport) => {
          setTransport(transport.name);
        });
      }
  
      function onDisconnect() {
        setIsConnected(false);
        setTransport("N/A");
      }
  
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
  
      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      };
    }, []);*/
  return (
    <>
    <Navbar/>
      <DataTable<Price>
      columns={columns}
      data={prices}
      filtered_data = {filteredPrices}
      itemsPerPage={10}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onSort={handleSort}
      onSearch={handleSearch}
      isLoading={isLoading}
      isSearching={search}
    />
     
    </>
  );
}
