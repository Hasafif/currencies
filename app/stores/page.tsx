'use client'
import React, { useState,useEffect } from 'react';
//import Ho from './components/mo';
import Navbar from '@/app/components/navbar';
import DataTable from '../components/DataTable';
import axios from 'axios';
import BasicStoreForm from '../components/StoreForm';
import { showToast } from '../components/Notification/Toast';

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
    price: GLfloat;
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
  // Column definitions
  const columns: any[] = [
    { key: 'id', label: 'ID', type: 'string', sortable: true },
    { key: 'name', label: 'Name', type: 'string', sortable: true },
    { key: 'state', label: 'State', type: 'string', sortable: true },
    { key: 'city', label: 'City', type: 'string', sortable: true },
    { key: 'address', label: 'Address', type: 'string', sortable: true },
    { key: 'email', label: 'Email', type: 'string', sortable: true },
    { key: 'phone', label: 'Phone', type: 'string', sortable: true },
    { key: 'currencies', label: 'Currencies', type: 'string', sortable: true },
    { key: 'bulletin', label: 'Bulletin', type: 'bulletin', sortable: true },
    { key: 'created at', label: 'Created At', type: 'datetime', sortable: true }
  ];
export default function Stores() {
  
  
    const [stores, setStores] = useState<Store[]>([]);
    const [filteredstores, setfiltered_Stores] = useState<Store[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setsearch] = useState(false);
    const [storename, setStorename] = useState('');
    const handleAdd = () => {
      // Handle add logic
      setIsOpen(true)
    };
  
    const handleDelete = async (store: Store) => {
      // Handle delete logic
      const res = await axios.post('/api/delete',{type:'stores',id:store.id})
      if (res.status==200) {showToast.success({message:'Store Deleted Succefully',duration:5000})
         const filteredStores = stores.filter(s => s.id != store.id);
        setStores(filteredStores);
        setfiltered_Stores(filteredStores);
      }
    else {
        showToast.error({message:'Error Deleting Store',duration:5000})
      }
      };
  
    const handleSort = (key: string, direction: any) => {
      // Handle sort logic
    };
  
    const handleSearch = (searchTerm: string) => {
      // Handle search logic
      console.log(searchTerm)
      setStorename(searchTerm)
      setsearch(true)
    };
    const handleSubmit = (e:any) => {
      // Handle search logic
    };
  useEffect(() => {
    const getstores = async () => {
        const res = await axios.post('http://localhost:3000/api/stores',{type:'stores'})
          console.log(res.data.stores)
        setStores(res.data.stores);
          setIsLoading(false);
    };
    getstores();
  } 
  , []);
  
  useEffect(() => {
    if (search) {
      setsearch(true);
        // Filter the projects array based on the name
   const filteredStores = stores.filter(store => store.name === storename);
   stores.forEach(store => console.log(store.name));
  if (filteredStores.length==0 && (storename== ' '|| storename== ' '|| storename=='')) {
    setfiltered_Stores(stores)
  }
  else {
    setfiltered_Stores(filteredStores);}

 
}
  }, [setStorename,storename,setsearch,search]);
  return (
    <>
    <Navbar/>
      <DataTable<Store>
      columns={columns}
      data={stores}
      filtered_data = {filteredstores}
      itemsPerPage={10}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onSort={handleSort}
      onSearch={handleSearch}
      isLoading={isLoading}
      isSearching={search}
    />
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding panel */}
      <div className={`flex-1 fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
    <BasicStoreForm/>
      </div>
    </>
  );
}
