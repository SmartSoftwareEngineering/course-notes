import React from 'react'
import ItemRow from './ItemRow'

function ItemList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return <p className="no-items">No items found</p>
  }

  return (
    <div className="list-container">
      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <ItemRow 
              key={item.id} 
              item={item} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ItemList