import React, { useState, useEffect } from 'react'

function ItemForm({ item, onSubmit, onCancel, loading }) {
  const initialFormState = {
    id: null,
    name: '',
    company: '',
    description: ''
  }
  
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (item) {
      setFormData(item)
    } else {
      setFormData(initialFormState)
    }
  }, [item])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.company.trim()) newErrors.company = 'Company is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Submit the validated form
    onSubmit(formData)
    
    // Reset form if it's an add operation
    if (!item) {
      setFormData(initialFormState)
    }
  }

  return (
    <div className="form-container">
      <h2>{item ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            disabled={loading}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        
        <div className="form-group">
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={errors.company ? 'error' : ''}
            disabled={loading}
          />
          {errors.company && <p className="error-text">{errors.company}</p>}
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            disabled={loading}
          ></textarea>
        </div>
        
        <div className="form-buttons">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : item ? 'Update' : 'Add'}
          </button>
          {item && (
            <button 
              type="button" 
              onClick={onCancel}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ItemForm