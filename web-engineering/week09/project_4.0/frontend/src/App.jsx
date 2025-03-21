import { useState, useEffect } from 'react'
import Header from './components/Header'
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'
import FilterBar from './components/FilterBar'
import Notification from './components/Notification'
import { fetchItems, createItem, updateItem, deleteItem } from './services/api'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [currentItem, setCurrentItem] = useState(null)
  const [filterCompany, setFilterCompany] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })

  const getItems = async () => {
    try {
      setLoading(true)
      const data = await fetchItems()
      setItems(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch items. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch items from API
  useEffect(() => {
    getItems()
  }, [])

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 3000)
  }

  // CRUD operations
  const addItem = async (item) => {
    try {
      setLoading(true)
      const newItem = await createItem(item)
      setItems([...items, newItem])
      showNotification('Item added successfully')
    } catch (err) {
      setError('Failed to add item')
      console.error(err)
    } finally {
      getItems()
      setLoading(false)
    }
  }

  const editItemHandler = async (updatedItem) => {
    try {
      setLoading(true)
      const result = await updateItem(updatedItem.id, updatedItem)
      setItems(items.map(item => item.id === updatedItem.id ? result : item))
      setCurrentItem(null)
      showNotification('Item updated successfully')
    } catch (err) {
      setError('Failed to update item')
      console.error(err)
    } finally {
      getItems()
      setLoading(false)
    }
  }

  const deleteItemHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        setLoading(true)
        await deleteItem(id)
        setItems(items.filter(item => item.id !== id))
        showNotification('Item deleted successfully')
      } catch (err) {
        setError('Failed to delete item')
        console.error(err)
      } finally {
        setLoading(false)
        getItems()
      }
    }
  }

  const editItem = (item) => {
    setCurrentItem(item)
  }

  // Filter items by company
  const filteredItems = filterCompany 
    ? items.filter(item => item.company === filterCompany)
    : items

  // Get unique companies for filter
  const companies = [...new Set(items.map(item => item.company))]

  return (
    <div className="container">
      <Header />
      
      {notification.message && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
        />
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      <ItemForm 
        item={currentItem} 
        onSubmit={currentItem ? editItemHandler : addItem} 
        onCancel={() => setCurrentItem(null)}
        loading={loading}
      />
      
      <FilterBar 
        companies={companies}
        filterCompany={filterCompany}
        setFilterCompany={setFilterCompany}
      />
      
      {loading && !items.length ? (
        <div className="loading">Loading items...</div>
      ) : (
        <ItemList 
          items={filteredItems} 
          onEdit={editItem} 
          onDelete={deleteItemHandler} 
        />
      )}
    </div>
  )
}

export default App