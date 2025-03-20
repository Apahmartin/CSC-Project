import axios from 'axios';
import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";

export const State = createContext();

export default function StateContext({ children }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [width] = useState(641);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);


  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (window.innerWidth < width) {
      alert("Place your phone in landscape mode for the best experience");
    }
  }, [width]);

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !quantity || !price) {
      toast.error("Please fill in all inputs");
    } else {
      const newItems = {
        id: uuidv4(),
        description,
        quantity,
        price,
        amount : quantity * price,
      };
      setDescription("");
      setQuantity("");
      setPrice("");
      setAmount("");
      setList([...list, newItems]);
      setIsEditing(false);
      console.log(list);
    }
  };


  const calculateTotal = () => {
    const allItems = list.map((item) => item.price * item.quantity);
    setTotal(collect(allItems).sum());
  };

  useEffect(() => {
    calculateTotal();
  }, [list]);

  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
    setAmount(editingRow.amount);
  
    // Store the ID of the row being edited
    setEditingItemId(id);
  };
  
  // Function to update the item when "Finish Editing" is clicked
  const updateItem = async () => {
    if (!isEditing) return; // Only update when editing is finished
  
    // Prepare updated item data
    const updatedItem = {
      description,
      quantity,
      price,
      amount,
    };
  
    try {
      const response = await axios.put(`http://localhost:3000/invoices/${invoiceNumber}/items/${editingItemId}`, updatedItem);
      console.log("Invoice item updated successfully:", response.data);
      toast.success("Invoice item updated successfully!");
    } catch (error) {
      console.error("Error updating invoice item:", error);
      toast.error("Failed to update invoice item");
    } finally {
      setIsEditing(false); // Reset editing state after update
      setEditingItemId(null); // Clear editing item ID
    }
  };
  
  // Calculate items amount function
  useEffect(() => {
    const calculateAmount = (amount) => {
      setAmount(quantity * price);
    };

    calculateAmount(amount);
  }, [amount, price, quantity, setAmount]);


  const deleteRow = (id) => {
    setList(list.filter((row) => row.id !== id));
    setShowModal(false);
  };



  const submitInvoice = async () => {
    const invoiceData = {
      vendor: {
        name,
        address,
        email,
        phone,
        website,
      },
      client: {
        name: clientName,
        address: clientAddress,
      },
      payment: {
        name: bankName,
        account_number: bankAccount,
        type: "MOMO",
      },
      invoice: {
        number: invoiceNumber,
        date: invoiceDate,
        due_date: dueDate,
        notes: notes,
      },
      items: list.map(item => ({
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        amount: item.amount
      }))
    };

    try {
      const response = await axios.post("http://localhost:3000/invoices", invoiceData);
      console.log("Invoice submitted successfully:", response.data);
      toast.success("Invoice submitted successfully!");
    } catch (error) {
      console.error("Error submitting invoice:", error);
      toast.error("Failed to submit invoice");
    }
  };

  const context = {
    name,
    setName,
    address,
    setAddress,
    email,
    setEmail,
    phone,
    setPhone,
    bankName,
    setBankName,
    bankAccount,
    setBankAccount,
    website,
    setWebsite,
    clientName,
    setClientName,
    clientAddress,
    setClientAddress,
    invoiceNumber,
    setInvoiceNumber,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    notes,
    setNotes,
    description,
    setDescription,
    quantity,
    setQuantity,
    price,
    setPrice,
    amount,
    setAmount,
    list,
    setList,
    total,
    setTotal,
    width,
    componentRef,
    handlePrint,
    isEditing,
    setIsEditing,
    showModal,
    setShowModal,
    editRow,
    deleteRow,
    showLogoutModal,
    setShowLogoutModal,
    submitInvoice,
    handleSubmit,
    updateItem,
  };

  return <State.Provider value={context}>{children}</State.Provider>;
}
