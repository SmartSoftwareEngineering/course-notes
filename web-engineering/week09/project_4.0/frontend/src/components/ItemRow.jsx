import React from 'react'

function ItemRow({ item, onEdit, onDelete }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.company}</td>
      <td>{item.description}</td>
      <td className="actions">
        <button 
          onClick={() => onEdit(item)}
          className="btn-edit"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(item._id)}
          className="btn-delete"
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default ItemRow